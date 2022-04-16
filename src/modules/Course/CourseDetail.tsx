import { CourseModel } from '@/generated-api/Api';
import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import {
  Row,  Col,  Image,  Descriptions,  Typography,  Divider,  List,
  Button,  Skeleton,  Layout,  Space,  Breadcrumb, Tabs,
} from 'antd';
import { CourseContent } from './components/CourseContent';
import { FilePdfTwoTone } from '@/components/Icon/Icon';
import { CourseModel } from '@/generated-api/Api';
import { useRequest } from 'ahooks';
import { api } from '@/utils/api';
import moment from 'moment';

const { Content } = Layout;
const { TabPane } = Tabs;

const { Title, Paragraph, Text } = Typography;

export function CourseDetail({ course }: { course: CourseModel }) {
  return (
    <>
      <Content>
        <Row>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={{ pathname: '/courses' }}>{ course?.category?.[0]?.alias }</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{ course.title }</Breadcrumb.Item>
          </Breadcrumb>
        </Row>

        <p></p>

        <Row>
          <Space size={50} align={ 'start' }>
            <Col className='course-detail-header'>
              <Image preview={false} width={180} height={240} src={course.cover} />
            </Col>
            <Col className='course-detail-header' style={{ minWidth: '300px'}}>
              <Title level={2}>{course.title}</Title>
              <p>课程代码 : {course.courseCode}</p>
              <p>授课老师 : {course.teacher}</p>
              <p>开课时间 : {moment(course.created_at).format('YYYY-MM-DD')}</p>
              <Button type="primary" href={`#/content/${course.id}`} style={{ position: 'absolute', left: '0', bottom: '2px' }}>
                开始学习
              </Button>
            </Col>
          </Space>
        </Row>

        <Divider />

        <Row>
          <Tabs defaultActiveKey="1" size={'large'}>
            <TabPane tab='详情' key={1}>
              <Typography>

                <Title level={5}>【课程简介】</Title>
                <Paragraph>
                  {course.description}
                </Paragraph>

                <Title level={5}>【授课老师】</Title>
                <Paragraph>
                  {course.teacher}
                </Paragraph>
                <Paragraph>
                  联系方式: {course.contact}
                </Paragraph>

                <Title level={5}>【预备知识】</Title>
                <Paragraph>
                  { course?.requirement ?? 'xxx' }
                </Paragraph>

              </Typography>
            </TabPane>

            <TabPane tab='目录' key={2}>
              <CourseContent course={ course??{} }  />
            </TabPane>

            <TabPane tab='评论' key={3}>
              
            </TabPane>
          </Tabs>
        </Row>



      </Content>
    </>
  )
}

export function CourseDetailPage({ id }: { id: string }) {
  const { data, loading } = useRequest(
    () => {
      return api.courses.coursesRetrieve(id);
    },
    { refreshDeps: [id] }
  );
  const course = data?.data;

  return (
      <Skeleton avatar active title={false} paragraph={{ rows: 15 }} loading={loading || !course}>
        <CourseDetail course={ course } />
      </Skeleton>
  )
}
