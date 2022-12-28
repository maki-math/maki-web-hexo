import { CourseGalleryModel, CourseModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import { useRequest } from 'ahooks';
import {
  Card,
  Col,
  Image,
  Row,
  Tabs,
  Typography,
  Skeleton,
  Layout,
} from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Paragraph } = Typography;
const { TabPane } = Tabs;

function CourseCard({ course }: { course: CourseModel }) {
  const path = { pathname: `/courses/${course.id}`, state: { course: course } };
  const [ellipsis] = React.useState(true);
  return (
    <div>
      <Link to={path}>
        <Card className="course-card" hoverable>
          <Row className="course-card-body">
            <Col span={12}>
              <Image
                className="course-card-cover"
                src={course.cover}
                preview={false}
              />
            </Col>
            <Col span={12}>
              <div className="course-card-number">
                <h3> {course.courseCode} </h3>
              </div>
              <div className="course-card-description">
                <span> {course.shortDescription} </span>
              </div>
            </Col>
          </Row>
          <div style={{ height: 10 }}></div>
          <Row className="course-card-meta">
            <div style={{ height: '100%', width: '100%' }}>
              <h2> {course.title} </h2>
              <Paragraph
                ellipsis={ellipsis ? { rows: 6, expandable: false } : false}
              >
                {course.keywords}
              </Paragraph>
            </div>
          </Row>
        </Card>
      </Link>
    </div>
  );
}

function SubjectView({ courses }: { courses: CourseModel[] }) {
  return (
    <div className="courses-container">
      {courses.map((course, i) => (
        <CourseCard key={i} course={course}></CourseCard>
      ))}
    </div>
  );
}

function CourseView() {
  const { data } = useRequest(api.courseGallery.courseGalleryList);
  const courseGallery = data?.data ?? [];

  const recommendCourseGallery = courseGallery?.slice(-1) ?? [];
  const lastestCourseGallery = courseGallery?.slice(1, 2) ?? [];

  return (
    <Content>
      <CourseCategoryView
        courseGallery={courseGallery}
        title={'课程分类'}
      ></CourseCategoryView>
      <CourseCategoryView
        courseGallery={recommendCourseGallery}
        title={'推荐课程'}
      ></CourseCategoryView>
      <CourseCategoryView
        courseGallery={lastestCourseGallery}
        title={'最近更新课程'}
      ></CourseCategoryView>
    </Content>
  );
}

function CourseCategoryView({
  courseGallery,
  title,
}: {
  courseGallery: CourseGalleryModel[];
  title: string;
}) {
  return (
    <div style={{ marginTop: '20px' }}>
      <h1 className="h1-font-weight-700">{title}</h1>
      <Skeleton
        title={false}
        paragraph={{ rows: 6 }}
        active
        loading={courseGallery.length === 0}
      >
        {courseGallery?.[1] ? (
          <Tabs defaultActiveKey="0" type="card" size={'small'}>
            {courseGallery.map(({ categoryAlias, courses }, index) => {
              return (
                <TabPane tab={categoryAlias} key={index}>
                  <SubjectView courses={courses} key={index}></SubjectView>
                </TabPane>
              );
            })}
          </Tabs>
        ) : (
          <SubjectView
            courses={courseGallery?.[0]?.courses ?? []}
          ></SubjectView>
        )}
      </Skeleton>
    </div>
  );
}

export { CourseView };
