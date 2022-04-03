import { StandardPageLayout } from '@/components/Standard/StandardPageLayout';
import { CourseCategoryModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import { useRequest } from 'ahooks';
import { Table } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export function Courses() {
  const { data, loading } = useRequest(api.courses.listCourses);
  const courses = data?.data;

  const columns = [
    {
      title: '课程名称',
      dataIndex: 'title',
      key: 'title',
      render: (title: string) => {
        const path = { pathname: '/content', state: { title: title } };
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
  return (
    <StandardPageLayout title="课程列表">
      <Courses />
    </StandardPageLayout>
  );
}
