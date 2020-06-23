export default [
    {
        path: '/login',
        loader: () => import('../../pages/login/index'),
        permission: false 
    },
    {
        path: '/',
        loader: () => import('../../pages/home/index'),
        permission: true 
    }
]