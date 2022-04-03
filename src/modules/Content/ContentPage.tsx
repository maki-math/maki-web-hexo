import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@/components/Icon/Icon';
import { Layout, Menu } from 'antd';
import React from 'react';
import { PostDisplay } from './PostDisplay/PostDisplay';
import { useLocation } from 'react-router-dom';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export function ContentPage() {
  let course, articleId;

  const location = useLocation();
  if (location.state) {
    course = location.state.course;
    articleId = location.state.articleId;
  }
  console.log(course, articleId);

  return (
    <div className="h-100vh">
      <Layout className="h-full" style={{ padding: '24px 0' }}>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<NotificationOutlined />}
              title="subnav 3"
            >
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <PostDisplay></PostDisplay>
        </Content>
      </Layout>
    </div>
  );
}
