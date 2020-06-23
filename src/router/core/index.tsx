import React from 'react';
import { Route, useParams, useHistory, useLocation } from 'react-router-dom';
import routes from '../../config/routers/index';
import DocumentTitle from 'react-document-title';   // 根据不同的路由改变文档的title

// function CustomHandle(Component }) {
//   const parm = useParams();
//   const history = useHistory();
//   const location = useLocation();
//   return <Component/>;
// }
export default (permission = true) => {
  return routes
    .filter(i => i.permission === permission || i.permission === undefined)
    .map((routea, index) => {
      return (
        <Route
          key={`route-key-${index}`}
          path={routea.path}
          exact={routea.exact ? routea.exact : false}
          component={routea.component}/>
      );
    });
};
