import { StandardPageLayout } from '@/components/Standard/StandardPageLayout';
import { CourseCategoryModel, CourseModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import { useRequest } from 'ahooks';
import { Table, Popconfirm, Space, Button, message } from 'antd';
import { default as React, FC } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { CourseDetailPage } from './CourseDetail';
import { CourseEditingPage } from './CourseEditingPage';

export function CourseListPage() {
  const { data, loading, refresh } = useRequest(api.courses.coursesList);
  const courses = data?.data;

  const deleteCourse = (course: CourseModel) => {
     api.courses.coursesDestroy(course.id)
      .then((res) => {
        message.success("删除成功");
        refresh();
      })
      .catch((err) => {
        message.error("删除失败, 请稍后重试.");
      });
  };
  const { run } = useRequest(deleteCourse, { manual: true });

  const columns = [
    {
      title: '课程名称',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, row: CourseModel) => {
        const path = {
          pathname: '/courses/' + row.id,
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
      sorter: (a, b) => a.category?.[0]?.id > (b.category?.[0]?.id || -1),
      sortDirections: ['descend'],
    },
    {
      title: '授课老师',
      dataIndex: 'teacher',
      key: 'teacher',
      sorter: (a, b) => a.teacher > b.teacher,
      sortDirections: ['descend'],
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (id: number, row: CourseModel) => {
        const path = {
          pathname: '/courses/edit/' + id,
        };
        return (
          <Space>
            <Link to={path}>编辑</Link>
            <Popconfirm
              title="确定要删除吗?"
              onConfirm={() => run(row)}
              onCancel={() => {}}
              okText="确定"
              cancelText="取消"
            >
              <a href="#">删除</a>
            </Popconfirm>
        </Space>);
      }
    },
  ];

  return <StandardPageLayout title="课程列表">
    <Space direction="vertical" size="middle" style={{display: "flex"}}>
      <Link to="courses/edit">
        <Button type="primary">添加课程</Button>
      </Link>
      <Table columns={columns} dataSource={courses} loading={loading} />
    </Space>
  </StandardPageLayout>
}

export const CoursesPage: FC<unknown> = () => {
  return (
    <Switch>
      <Route path="/courses" exact>        
        <CourseListPage />        
      </Route>
      <Route path="/courses/edit" exact>
        <CourseEditingPage id={0}></CourseEditingPage>
      </Route>
      <Route
        path="/courses/:id"
        render={(props) => {
          return (
            <StandardPageLayout title="课程详情">
              <CourseDetailPage id={props.match.params.id} />
            </StandardPageLayout>
          );
        }}
      ></Route>
      <Route
        path="/courses/edit/:id"
        render={(props) => {
          return (
            <CourseEditingPage 
              id={Number(props.match.params.id)} 
            ></CourseEditingPage>
          );
        }}
      ></Route>
    </Switch>
  );
}
