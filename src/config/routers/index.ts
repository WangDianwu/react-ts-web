import loadable from './core';
import routeraddr from './routeraddr'
import common from './common'

export default [...loadable(routeraddr),...loadable(common)];
