import { StandardMDContainer } from '@/components/Standard/StandardMDContainer';
import { CourseModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import { AuthWrapper } from '@/utils/AuthWrapper';
import { useRequest } from 'ahooks';
import {
  Button,
  Col,
  Divider,
  Image,
  Layout,
  Row,
  Skeleton,
  Tabs,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import { CourseContent } from './components/CourseContent';

const { Content } = Layout;
const { TabPane } = Tabs;

const { Title } = Typography;

export function CourseDetail({ course }: { course: CourseModel }) {
  const path = {
    pathname: '/courses/edit/' + course.id,
  };

  return (
    <>
      <Content>
        <Row>
          <Row align="top" gutter={32}>
            <Col className="course-detail-header">
              <Image
                preview={false}
                width={180}
                height={240}
                src={course.cover}
              />
            </Col>
            <Col className="course-detail-header">
              <Title level={2}>{course.title}</Title>
              <p>课程代码 : {course.courseCode}</p>
              <p>授课老师 : {course.teacher}</p>
              <p>开课时间 : {dayjs(course.created_at).format('YYYY-MM-DD')}</p>
              <AuthWrapper codename="change_course">
                <Link to={path}>编辑课程</Link>
              </AuthWrapper>
              {false && (
                <Button
                  type="primary"
                  href={`#/content/${course.id}`}
                  style={{ position: 'absolute', left: '0', bottom: '2px' }}
                >
                  开始学习
                </Button>
              )}
            </Col>
          </Row>
        </Row>

        <Divider />

        <div>
          <Tabs defaultActiveKey="1" size={'large'}>
            <TabPane tab="详情" key={1}>
              <Typography>
                <StandardMDContainer
                  text={course.description}
                ></StandardMDContainer>
              </Typography>
            </TabPane>

            {false && (
              <TabPane tab="目录" key={2}>
                <CourseContent course={course} />
              </TabPane>
            )}
            {false && (
              <TabPane tab="评论" key={3}>
                暂无评论
              </TabPane>
            )}
          </Tabs>
        </div>
      </Content>
    </>
  );
}

export function CourseDetailPage({ id }: { id: number }) {
  const { data, loading } = useRequest(
    () => {
      return api.courses.coursesRetrieve(id);
    },
    { refreshDeps: [id] }
  );
  const course = data?.data;

  return (
    <Skeleton
      avatar
      active
      title={false}
      paragraph={{ rows: 15 }}
      loading={loading || !course}
    >
      <CourseDetail course={course} />
    </Skeleton>
  );
}
