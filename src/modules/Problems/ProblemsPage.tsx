import { Button, Layout, PageHeader } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { default as React, FC } from 'react';
import { Link, Route } from 'react-router-dom';
import { ProblemEditingPage } from './ProblemEditingPage';

export const ProblemsPage: FC<unknown> = () => {
  return (
    <div className="h-100vh">
      <Layout className="h-full" style={{ padding: '24px 0' }}>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <PageHeader ghost={false} title="题目列表" className="h-full">
            <Link to="/problems/edit">
              <Button type="primary">添加题目</Button>
            </Link>
            <Content>
              <Route path="/problems/edit">
                <ProblemEditingPage></ProblemEditingPage>
              </Route>
            </Content>
          </PageHeader>
        </Content>
      </Layout>
    </div>
  );
};
