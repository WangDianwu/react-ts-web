// 部分代码参考dav.js
import invariant from 'invariant';
import * as sagaEffects from 'redux-saga/effects';
import { takeEvery, takeLatest, throttle } from 'redux-saga/effects';
import prefixType from './prefixType';
import { NAMESPACE_SEP } from './constants';

function createEffects(model:any) {
  function put(action:any) {
    const { type } = action;
    return sagaEffects.put({
      ...action,
      type: prefixType(type, model)
    });
  }

  // The operator `put` doesn't block waiting the returned promise to resolve.
  // Using `put.resolve` will wait until the promsie resolve/reject before
  // resuming. It will be helpful to organize multi-effects in order, and increase
  // the reusability by seperate the effect in stand-alone pieces.
  // https://github.com/redux-saga/redux-saga/issues/336
  function putResolve(action:any) {
    const { type } = action;
    return sagaEffects.put({
      ...action,
      type: prefixType(type, model)
    });
  }
  put.resolve = putResolve;

  function take(type:any) {
    if (typeof type === 'string') {
      return sagaEffects.take(prefixType(type, model));
    }
    if (Array.isArray(type)) {
      return sagaEffects.take(
        type.map(t => {
          if (typeof t === 'string') {
            const a = prefixType(t, model);
            return a;
          }
          return t;
        })
      );
    }
    return sagaEffects.take(type);
  }
  return {
    ...sagaEffects,
    put,
    take
  };
}

function applyOnEffect(fns:any, effect:any, model:any, key:any) {
  for (const fn of fns) {
    effect = fn(effect, sagaEffects, model, key);
  }
  return effect;
}

function getWatcher(key:any, _effect:any, model:any, onError:any, onEffect:any) {
  let effect = _effect;
  let type = 'takeEvery';
  let ms:any;

  if (Array.isArray(_effect)) {
    effect = _effect[0];
    const opts = _effect[1];
    if (opts && opts.type) {
      type = opts.type;
      if (type === 'throttle') {
        invariant(
          opts.ms,
          'app.start: opts.ms should be defined if type is throttle'
        );
        ms = opts.ms;
      }
    }
    invariant(
      ['watcher', 'takeEvery', 'takeLatest', 'throttle'].indexOf(type) > -1,
      'app.start: effect type should be takeEvery, takeLatest, throttle or watcher'
    );
  }

  function noop() {}
  function* sagaWithCatch(...args:any) {
    const { __dva_resolve: resolve = noop, __dva_reject: reject = noop } =
      args.length > 0 ? args[0] : {};
    try {
      yield sagaEffects.put({ type: `${key}${NAMESPACE_SEP}@@start` });
      console.log(...args.concat(createEffects(model)));
      const ret = yield effect(...args.concat(createEffects(model)));
      yield sagaEffects.put({ type: `${key}${NAMESPACE_SEP}@@end` });
      resolve(ret);
    } catch (e) {
      onError(e, { key, effectArgs: args });
      if (!e._dontReject) {
        reject(e);
      }
    }
  }

  const sagaWithOnEffect = applyOnEffect(onEffect, sagaWithCatch, model, key);

  switch (type) {
    case 'watcher':
      return sagaWithCatch;
    case 'takeLatest':
      return function*() {
        yield takeLatest(key, sagaWithOnEffect);
      };
    case 'throttle':
      return function*() {
        yield throttle(ms, key, sagaWithOnEffect);
      };
    default:
      return function*() {
        yield takeEvery(key, sagaWithOnEffect);
      };
  }
}

export default function getSaga(effects:any, model:any, onError:any, onEffect:any) {
  return function*() {
    for (const key in effects) {
      if (Object.prototype.hasOwnProperty.call(effects, key)) {
        const watcher = getWatcher(
          `${key}`,
          effects[key],
          model,
          onError,
          onEffect
        );
        const task = yield sagaEffects.fork(watcher);
        yield sagaEffects.fork(function*() {
          yield sagaEffects.take(`${model.namespace}/@@CANCEL_EFFECTS`);
          yield sagaEffects.cancel(task);
        });
      }
    }
  };
}
