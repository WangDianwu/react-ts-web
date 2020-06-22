import { LoaderOptionsPlugin } from "webpack";

export default [
{
    path:'/home',
    Loader:()=> import('../../pages/login/index'),
    permission:true
}
]