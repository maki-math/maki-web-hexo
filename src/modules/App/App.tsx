import { CustomLayoutHeader } from '@/components/CustomLayoutHeader/CustomLayoutHeader';
import { GithubOutlined } from '@/components/Icon/Icon';
import { REPOSITORY_URL } from '@/dicts/global';
import {
  AuthModuleEnum,
  PermissionsProvider,
  TokenProvider,
  useAuth,
} from '@/utils/auth-token';
import { usePageTracking, useTracking } from '@/utils/tracking';
import {
  Button,
  Col,
  Divider,
  FloatButton,
  Layout,
  Menu,
  Typography,
} from 'antd';
import 'antd/dist/reset.css';

import React from 'react';
import {
  HashRouter as Router,
  Link,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { ArticleListPage } from '../Content/ContentListPage';
import { CoursesPage } from '../Course/Courses';
import { HomePage } from '../Home/HomePage';
import { QuestionsPage } from '../Questions/QuestionsPage';
import { UserLoginIndicator } from '../User/UserLoginIndicator/UserLoginIndicator';
import { BackToHome } from './components/BackToHome';
import Scroll2Top from './components/Scroll2Top';

const { Content, Footer } = Layout;

const Nav = withRouter(({ history }) => {
  const isAuthed = useAuth(AuthModuleEnum.QuestionPage);
  return (
    <CustomLayoutHeader
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: '#fff',
      }}
    >
      <h2
        className="logo"
        style={{ marginRight: '10px', whiteSpace: 'nowrap' }}
      >
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
          {isAuthed && (
            <Menu.Item key="/questions/sets">
              <Link to="/questions/sets">
                习题集
                <Typography.Text type="danger">
                  <sup>alpha</sup>
                </Typography.Text>
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </Col>
      <div>
        <UserLoginIndicator></UserLoginIndicator>
      </div>
    </CustomLayoutHeader>
  );
});

function AppContent() {
  usePageTracking();
  return (
    <Scroll2Top>
      <TokenProvider>
        <PermissionsProvider>
          <Layout>
            <FloatButton.BackTop />
            <Nav></Nav>
            <Content>
              <Switch>
                <Route path="/courses">
                  <CoursesPage />
                </Route>
                <Route path="/content">
                  <ArticleListPage />
                </Route>
                <Route path="/questions">
                  <QuestionsPage />
                </Route>
                <Route path="/">
                  <div style={{ padding: '0 50px' }}>
                    <HomePage></HomePage>
                  </div>
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
              <div>Copyright © 2020 - 2023 Maki's Lab. 保留所有权利.</div>
              <a href="http://beian.miit.gov.cn">沪ICP备2022010774号</a>
            </Footer>
          </Layout>
        </PermissionsProvider>
      </TokenProvider>
    </Scroll2Top>
  );
}

function App() {
  useTracking();

  return (
    <Router>
      <AppContent></AppContent>
    </Router>
  );
}

export default App;
