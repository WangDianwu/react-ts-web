export default [
    {
      code: '100000',
      name: '首页',
      router: '/',
      icon: 'home',
      children: []
    },
    {
      code: '200000',
      name: '系统管理',
      router: '#',
      icon: 'appstore',
      children: [
        {
          code: '200200',
          name: '公司信息',
          router: '/role',
          icon: '#'
        },
        {
          code: '200100',
          name: '用户管理',
          router: '/user',
          icon: '#'
        },
        {
          code: '200300',
          name: '岗位权限',
          router: '/group',
          icon: '#'
        },
        {
          code: '200400',
          name: '参数表设置',
          router: '/message',
          icon: '#'
        }
      ]
    }
  ];
  