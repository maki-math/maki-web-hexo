import { StandardPageLayout } from '@/components/Standard/StandardPageLayout';
import { CourseCategoryModel, CourseModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import { useRequest } from 'ahooks';
import { Table } from 'antd';
import React from 'react';
import { Link, Route, useRouteMatch } from 'react-router-dom';

export function CourseList() {
  const { data, loading } = useRequest(api.courses.listCourses);
  const courses = data?.data;

  const columns = [
    {
      title: '课程名称',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, row: CourseModel) => {
        const path = {
          pathname: '/courses/' + row.id,
          state: { title: title },
        };
        return <Link to={path}>{title}</Link>;
      },
    },
    {
      title: '学科分类',
      dataIndex: 'category',
      key: 'category',
      render: (categoryList: CourseCategoryModel[]) => {
        return categoryList.map((category) => category.alias).join('/');
      },
    },
    {
      title: '授课老师',
      dataIndex: 'teacher',
      key: 'teacher',
    },
  ];

  return <Table columns={columns} dataSource={courses} loading={loading} />;
}

export function CourseListPage() {
  const { url } = useRouteMatch();
  return (
    <>
      <Route
        path={`${url}/:id`}
        render={({ match }) => {
          return (
            <StandardPageLayout title="课程内容">
              {match.params.id}
            </StandardPageLayout>
          );
        }}
      ></Route>
      <Route path={`${url}/`} exact>
        <StandardPageLayout title="课程列表">
          <CourseList />
        </StandardPageLayout>
      </Route>
    </>
  );
}
