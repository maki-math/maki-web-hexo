import { StandardPageLayout } from '@/components/Standard/StandardPageLayout';
import { Button } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { default as React, FC } from 'react';
import { Link, Route } from 'react-router-dom';
import { ProblemEditingPage } from './ProblemEditingPage';

export const ProblemsPage: FC<unknown> = () => {
  return (
    <StandardPageLayout title="题目列表">
      <Link to="/problems/edit">
        <Button type="primary">添加题目</Button>
      </Link>
      <Content>
        <Route path="/problems/edit">
          <ProblemEditingPage></ProblemEditingPage>
        </Route>
      </Content>
    </StandardPageLayout>
  );
};
