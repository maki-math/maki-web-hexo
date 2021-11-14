import { CustomLayoutHeader } from '@/components/CustomLayoutHeader/CustomLayoutHeader';
import { GithubOutlined } from '@/components/Icon/Icon';
import { REPOSITORY_URL } from '@/dicts/global';
import { Button, Col, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { Route, HashRouter as Router, Switch, Link } from 'react-router-dom';
import { Home } from '../Home/Home';

const { Content, Footer } = Layout;

function Nav() {
  return (
    <CustomLayoutHeader style={{ position: 'sticky', top: 0, zIndex: 10 }}>
      <h2 style={{ marginRight: '10px' }}>Maki-Math</h2>
      <Col flex={1}>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['home']}>
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="courses">
            <Link to="/courses">Courses</Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about">About</Link>
          </Menu.Item>
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
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Nav></Nav>
        <Content style={{ padding: '0 50px' }}>
          <Switch>
            <Route path="/about">about</Route>
            <Route path="/courses">courses</Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>footer</Footer>
      </Layout>
    </Router>
  );
}

export default App;
