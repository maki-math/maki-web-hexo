import { Card, Col, Divider, Row, Image, Typography, Tabs } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Paragraph } = Typography;
const { TabPane } = Tabs;
var isloaded = false;
var courseGallery = [], setCourseGallery,
    courses = [], setCourses;

export interface ContentsNode {
  title: string;
  children: ContentsNode[] | null;
  articleId: string;
}

export interface CourseGalleryItem {
  categoryAlias: string; // 数学
  category: string; // "mathematics"
  courses: Course[];
}

export interface Course {
  id: number;
  title: string;
  cover: string; // 封面图片大小保持一致
  courseCode: string; // 课程代码
  shortDescription: string;
  keywords: string;
  description: string; // markdown
  category: string; // 'mathematics'
  teacher: string;
  contact: string;
  contents: ContentsNode[];
}

function CourseCard({ course }: Course) {
  const path = { pathname: '/content', state: { course: course } };
  const [ellipsis, setEllipsis] = React.useState(true);
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

function SubjectView({ courses }: Course[]) {
  return (
    <div className="courses-container">
      {courses.map((course, i) => (
        <CourseCard key={i} course={course}></CourseCard>
      ))}
    </div>
  );
}

function CourseView() {
  if( !isloaded ) {
    [courseGallery, setCourseGallery] = useState([]);
    fetch('http://39.107.28.170/api/course_gallery')
      .then((x) => x.json())
      .then( x => {
        setCourseGallery(x)
        console.log(x)
        isloaded = true;
      })
      .catch((e) => {
        return [];
      });
  }

  const recommendCourseGallery = courseGallery ? courseGallery.slice(-1) : [];
  const lastestCourseGallery = courseGallery ? courseGallery.slice(1, 2) : [];

  return (
      <div class="course-view">
        <CourseCategoryView courseGallery={courseGallery} title={'课程分类'}></CourseCategoryView>
        <CourseCategoryView courseGallery={ recommendCourseGallery } title={'推荐课程'}></CourseCategoryView>
        <CourseCategoryView courseGallery={ lastestCourseGallery } title={'最近更新课程'}></CourseCategoryView>
      </div>
    )
}

function CourseCategoryView({ courseGallery, title }) {
  const category_size = courseGallery.length;

  return (
    <div style={{ marginTop: '20px' }}>
      <h1 class="h1-font-weight">{ title }</h1>
      {
        category_size > 1 ? 
          <Tabs defaultActiveKey="0" type="card" size={'small'}>
            {courseGallery.map(({ categoryAlias, courses }, index) => {
              return (
                <TabPane tab={categoryAlias} key={index}>
                  <SubjectView
                    courses={courses}
                    key={index}
                  ></SubjectView>
                </TabPane>
              );
            })}
          </Tabs>
        : null
      } 
      {
        category_size === 1 ? 
          <SubjectView
            courses={courseGallery[0].courses}
          ></SubjectView>
        : null
      }
    </div>
  );
}

export { CourseView }