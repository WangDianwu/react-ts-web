import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { SET_BREAD } from '@models/global';
import { Layout, Menu } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

export default
class MenuLayout extends React.Component<any,any> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false,
      ccmenu: [{
        "menuId": 360,
        "menuNum": 100001,
        "menuParent": 0,
        "menuState": 1,
        "menuName": "首页",
        "menuIco": "laptop",
        "menuUrl": "/",
        "menuFlag": 1,
        "menuSort": 1,
        "platformType": null
    }, {
        "menuId": 369,
        "menuNum": 100003,
        "menuParent": 100001,
        "menuState": 2,
        "menuName": "登陆",
        "menuIco": null,
        "menuUrl": "/login",
        "menuFlag": 1,
        "menuSort": 3,
        "platformType": null
    }]
    };
  }

  componentDidMount() {
    // this.getMenu();
  }

  toggleCollapsed = () => {
    const { collapsed } = this.state;

    this.setState({
      collapsed: !collapsed
    });
  };

  // getMenu = () => {
  //   const { userInfo } = this.props;
  //   const { userId } = userInfo;
  //   api.getMenu(userId).then((res) => {
  //     this.setState({
  //       ccmenu: res.data
  //     })
  //   })
  // }

  nav = (location: any, parent: { menuUrl: any; }, child: { menuUrl: any; } | null) => {
    return {
      ...location,
      pathname: child == null ? parent.menuUrl : child.menuUrl
    };
  };

  render() {
    const { collapsed, ccmenu } = this.state;
    const menu = ccmenu;
    const checkedSub: string[] | undefined = [];
    const checkedSubParent: string[] | undefined = [];
    let getMenuList = false;
    const stairMenu = (menu || []).filter((i: { menuState: number; }) => i.menuState === 1)
      .sort((a: { menuSort: number; }, b: { menuSort: number; }) => a.menuSort - b.menuSort);
    const menuList = stairMenu.map((item: { menuNum: any; menuName: any; menuUrl: any; }) => {
      const accessMenu = (menu || []).filter((i: { menuParent: any; }) => i.menuParent === item.menuNum)
        .sort((a: { menuSort: number; }, b: { menuSort: number; }) => a.menuSort - b.menuSort);
      const subMenus = accessMenu.map((sub: { menuUrl: any;menuNum: any;menuParent: any; menuName: any;} ) => {
        if (sub.menuUrl === window.location.hash.split('#')[1]) {
          checkedSub.push(String(sub.menuNum));
          checkedSubParent.push(String(sub.menuParent));
        } else {
          getMenuList = true;
        }
        return (
          <Menu.Item key={sub.menuNum}>
            <Link to={location => this.nav(location, item, sub)}>
              {sub.menuName}
            </Link>
          </Menu.Item>
        );
      });
      return (
        <SubMenu
          key={item.menuNum}
          title={
            <span>
              {/* <Icon type={item.menuIco} /> */}
              <span>{item.menuName}</span>
            </span>
          }
        >
          {subMenus}
        </SubMenu>
      );
    });
    return (
      <div>
        <Sider
          className='sider-container'
          collapsible
          width={200}
          collapsed={collapsed}
          onCollapse={this.toggleCollapsed}
          theme='light'
          style={{
            height: '95%',
            borderRight: 0
          }}
        >
          {(checkedSubParent.length && checkedSub.length) || getMenuList ? <Menu
            mode='inline'
            theme='light'
            defaultOpenKeys={checkedSubParent}
            defaultSelectedKeys={checkedSub}
          >
            {menuList}
          </Menu> : null}
        </Sider>

        <div className='phone-top'>客服电话:</div>
        <div className='phone-buttom' title='400-007-5656'>400-007-5656</div>
      </div>
    );
  }
}
