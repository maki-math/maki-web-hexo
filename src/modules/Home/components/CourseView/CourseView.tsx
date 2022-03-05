import { Card, Col, Divider, Row, Image, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { SubjectViewListMock } from './mock/SubjectViewListMock';

const { Meta } = Card;
const { Paragraph } = Typography;

export interface Course {
  title: string,
  titleEn: string, // 英文标题
  cover: string, // 封面图片大小保持一致, 135 : 190 (A4)
  number: string, // 课程代码
  description: string,
  keywords: string, 
  class: string, // 课程分类
}

export interface SubjectViewProps {
  title: string;
  courses: Course[];
}

function CourseCard({course}: Course) {
  const path = { pathname: '/courses', state: { course: course } }; // Detials页面无法获取state。
  const [ellipsis, setEllipsis] = React.useState(true);
  return (
    <div>
      <Link to={path}>
        <Card className='course-card' hoverable>
          <Row className='course-card-body'>
            <Col span={12}>
              <Image className='course-card-cover' src={course.cover} preview={false} />
            </Col>
            <Col span={12}>
                <div className='course-card-number'>
                  <h3> {course.number} </h3>
                </div>
                <div className='course-card-description'>
                  <h2> {course.class} </h2>
                  <span> {course.description} </span>
                </div>
            </Col>
          </Row>
          <div style={{ height: 10 }}></div>
          <Row className='course-card-meta'>
            <div style={{ height: '100%', width: '100%' }}>
              <h1> {course.title} </h1>
              <Paragraph ellipsis={ellipsis ? { rows: 6, expandable: false } : false}> {course.keywords} </Paragraph>
            </div>
          </Row>
        </Card>
      </Link>
    </div>
  );
}

function SubjectView({ title, courses }: SubjectViewProps) {
  return (
    <div>
      <h1 className="subject-title center"> {title} </h1>
      <div className="courses-container">
        {courses.map((course, i) => <CourseCard key={i} course={course}></CourseCard> )}
      </div>
    </div>
  );
}

export function CourseView() {
  return (
    <div style={{ marginTop: '20px' }}>
      <div className="center">
        <h1>开始你的学习计划</h1>
      </div>
      <Divider></Divider>
      {SubjectViewListMock.map(({ title, courses }, index) => {
        return (
          <SubjectView
            title={title}
            courses={courses}
            key={index}
          ></SubjectView>
        );
      })}
    </div>
  );
}
