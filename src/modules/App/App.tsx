import { CustomLayoutHeader } from '@/components/CustomLayoutHeader/CustomLayoutHeader';
import { GithubOutlined } from '@/components/Icon/Icon';
import { REPOSITORY_URL } from '@/dicts/global';
import { Button, Col, Divider, Layout, Menu, Typography } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { ContentListPage } from '../Content/ContentListPage';
import { Details } from '../Course/Details';
import { HomePage } from '../Home/HomePage';
import { ProblemsPage } from '../Problems/ProblemsPage';

const { Content, Footer } = Layout;

function Nav() {
  return (
    <CustomLayoutHeader style={{ position: 'sticky', top: 0, zIndex: 10 }}>
      <h2 style={{ marginRight: '10px' }}>Maki-Math</h2>
      <Col flex={1}>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['home']}>
          <Menu.Item key="home">
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="content">
            <Link to="/content">文章</Link>
          </Menu.Item>
          <Menu.Item key="courses">
            <Link to="/courses">课程</Link>
          </Menu.Item>
          <Menu.Item key="problems">
            <Link to="/problems">
              习题集
              <Typography.Text type="danger">
                <sup>beta</sup>
              </Typography.Text>
            </Link>
          </Menu.Item>
        </Menu>
      </Col>
    </CustomLayoutHeader>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Nav></Nav>
        <Content style={{ padding: '0 50px' }}>
          <Switch>
            <Route path="/courses">
              <Details />
            </Route>
            <Route path="/content">
              <ContentListPage />
            </Route>
            <Route path="/problems">
              <ProblemsPage />
            </Route>
            <Route path="/">
              <HomePage></HomePage>
            </Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <Divider></Divider>
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
          <div>Copyright © 2020 - 2022 Maki's Lab. 保留所有权利.</div>
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
