export const isNumber = (value: any): boolean => typeof value === 'number'

export const emptyObject = Object.freeze({})

// 判断是否未定义
export const isUndef = (v: any) => {
  return v === undefined || v === null
}

// 判断是否定义
export const isDef = (v: any) => {
  return v !== undefined && v !== null
}

// 判断是否true
export const isTrue = (v: any) => {
  return v === true
}

// 判断是否false
export const isFalse = (v: any) => {
  return v === false
}

// 判断是否为对象
export const isObject = (v: any) => {
  return v !== null && typeof v === 'object'
}

// 判断是否为字符串
export const isString = (v: any) => {
  return typeof v === 'string'
}

// 判断是否为Body
export const isBody = (v: any) => {
  return v === 'body'
}

// 判断是否为Html
export const isHtml = (v: any) => {
  return v === 'html'
}

// 空方法
export const noop = (v = {}) => {
  return v
}

