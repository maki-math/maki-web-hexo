import { CustomLayoutHeader } from '@/components/CustomLayoutHeader/CustomLayoutHeader';
import { GithubOutlined } from '@/components/Icon/Icon';
import { REPOSITORY_URL } from '@/dicts/global';
import { Button, Col, Layout, Menu, Typography } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { HashRouter as Router, Link, Route, Switch, withRouter } from 'react-router-dom';
import { ContentPage } from '../Content/ContentPage';
import { Details } from '../Course/Details';
import { HomePage } from '../Home/HomePage';
import { ProblemsPage } from '../Problems/ProblemsPage';
import Scroll2Top from './components/Scroll2Top'

const { Content, Footer } = Layout;

const Nav = withRouter(({ history }) => {
  return (
    <CustomLayoutHeader style={{ position: 'sticky', top: 0, zIndex: 10 }}>
      <h2 style={{ marginRight: '10px' }}>Maki-Math</h2>
      <Col flex={1}>
        <Menu theme="light" 
          mode="horizontal" 
          defaultSelectedKeys={['/']}
          selectedKeys={[history.location.pathname]}
         >
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/content">
            <Link to="/content">Content</Link>
          </Menu.Item>
          <Menu.Item key="/courses">
            <Link to="/courses">Courses</Link>
          </Menu.Item>
          <Menu.Item key="/about">
            <Link to="/about">About</Link>
          </Menu.Item>
          <Menu.Item key="/problems">
            <Link to="/problems">
              习题集
              <Typography.Text type="danger">
                <sup>beta</sup>
              </Typography.Text>
            </Link>
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
})

function App() {
  return (
    <Router>
      <Scroll2Top>
        <Layout>
          <Nav></Nav>
          <Content style={{ padding: '0 50px' }}>
            <Switch>
              <Route path="/about">about</Route>
              <Route path="/courses">
                <Details />
              </Route>
              <Route path="/content">
                <ContentPage />
              </Route>
              <Route path="/problems">
                <ProblemsPage />
              </Route>
              <Route path="/">
                <HomePage></HomePage>
              </Route>
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>footer</Footer>
        </Layout>
      </Scroll2Top>
    </Router>
  );
}

export default App;
