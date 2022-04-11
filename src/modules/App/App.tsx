import { CustomLayoutHeader } from '@/components/CustomLayoutHeader/CustomLayoutHeader';
import { GithubOutlined } from '@/components/Icon/Icon';
import { REPOSITORY_URL } from '@/dicts/global';
import { Button, Col, Divider, Layout, Menu, Typography } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import {
  HashRouter as Router,
  Link,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { ArticleListPage } from '../Content/ContentListPage';
import { CourseListPage } from '../Course/Courses';
import { HomePage } from '../Home/HomePage';
import { QuestionsPage } from '../Questions/QuestionsPage';
import { UserLoginIndicator } from '../User/UserLoginIndicator/UserLoginIndicator';
import { BackToHome } from './components/BackToHome';
import Scroll2Top from './components/Scroll2Top';

const { Content, Footer } = Layout;

const Nav = withRouter(({ history }) => {
  return (
    <CustomLayoutHeader style={{ position: 'sticky', top: 0, zIndex: 10 }}>
      <h2 style={{ marginRight: '10px' }}>
        <BackToHome></BackToHome>
      </h2>
      <Col flex={1}>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['/']}
          selectedKeys={[history.location.pathname]}
        >
          <Menu.Item key="/">
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="/courses">
            <Link to="/courses">课程</Link>
          </Menu.Item>
          <Menu.Item key="/content">
            <Link to="/content">文章</Link>
          </Menu.Item>
          <Menu.Item key="/questions">
            <Link to="/questions">
              习题集
              <Typography.Text type="danger">
                <sup>alpha</sup>
              </Typography.Text>
            </Link>
          </Menu.Item>
        </Menu>
      </Col>
      <div>
        <UserLoginIndicator></UserLoginIndicator>
      </div>
    </CustomLayoutHeader>
  );
});

function App() {
  return (
    <Router>
      <Scroll2Top>
        <Layout>
          <Nav></Nav>
          <Content style={{ padding: '0 50px' }}>
            <Switch>
              <Route path="/courses">
                <CourseListPage></CourseListPage>
              </Route>
              <Route path="/content">
                <ArticleListPage />
              </Route>
              <Route path="/questions">
                <QuestionsPage />
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
      </Scroll2Top>
    </Router>
  );
}

export default App;
