import { Card, Col, Divider, Row, Image, Typography } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Paragraph } = Typography;

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

const courseGallery = await fetch('http://39.107.28.170/api/course_gallery')
  .then((x) => x.json())
  .catch((e) => {
    console.log(e);
    return [];
  });

console.log(courseGallery);

function CourseCard({ course }: Course) {
  const path = { pathname: '/courses', state: { course: course } };
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
                <h2> {} </h2>
                <span> {course.shortDescription} </span>
              </div>
            </Col>
          </Row>
          <div style={{ height: 10 }}></div>
          <Row className="course-card-meta">
            <div style={{ height: '100%', width: '100%' }}>
              <h1> {course.title} </h1>
              <Paragraph
                ellipsis={ellipsis ? { rows: 6, expandable: false } : false}
              >
                {' '}
                {course.keywords}{' '}
              </Paragraph>
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
      <h1 className="category-title center"> {title} </h1>
      <div className="courses-container">
        {courses.map((course, i) => (
          <CourseCard key={i} course={course}></CourseCard>
        ))}
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
      {courseGallery.map(({ categoryAlias, courses }, index) => {
        return (
          <SubjectView
            title={categoryAlias}
            courses={courses}
            key={index}
          ></SubjectView>
        );
      })}
    </div>
  );
}
