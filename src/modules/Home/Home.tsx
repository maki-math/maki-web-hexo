import { CustomLayoutHeader } from '@/components/CustomLayoutHeader/CustomLayoutHeader';
import {
  GithubOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@/components/Icon/Icon';
import { REPOSITORY_URL } from '@/dicts/global';
import { Breadcrumb, Button, Col, Layout, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React from 'react';

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

export function Home() {
  return (
    <Layout>
      <CustomLayoutHeader style={{ position: 'sticky', top: 0, zIndex: 10 }}>
        <h2 style={{ marginRight: '10px' }}>Maki-Math</h2>
        <Col flex={1}>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Col>
        <div>
          <Button
            shape="circle"
            type="text"
            size="large"
            onClick={() => window.open(REPOSITORY_URL)}
          >
            <GithubOutlined />
          </Button>
        </div>
      </CustomLayoutHeader>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          className="site-layout-background"
          style={{ padding: '24px 0' }}
        >
          <Sider className="site-layout-background" width={200}>
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
            Content
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}></Footer>
    </Layout>
  );
}
