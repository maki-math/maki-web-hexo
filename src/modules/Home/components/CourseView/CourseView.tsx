import { Card, Col, Divider, Row, Image, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { SubjectViewListMock } from './mock/SubjectViewListMock';

const { Meta } = Card;
const { Paragraph } = Typography;

export interface Course {
  title: string,
  titleEn: string, // 英文标题
  cover: string, // 封面图片大小保持一致
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
        <Card style={{ height: '100%', width: '100%', borderRadius: '4% / 3%' }} hoverable>
          <Row style={{ height: 0, paddingBottom: '70%' }}>
            <Col span={12}>
              <Image src={course.cover} preview={false} />
            </Col>
            <Col span={12}>
                <div style={{textAlign: 'right', marginLeft: '10px' }}>
                  <h3> {course.number} </h3>
                </div>
                <div style={{textAlign: 'right', position: 'absolute', bottom: 0, right: 0, marginLeft: '10px'}}>
                  <h2> {course.class} </h2>
                  <span> {course.description} </span>
                </div>
            </Col>
          </Row>
          <br/>
          <Row style={{ height: 0, paddingBottom: '55%', overflow: 'hidden' }}>
            <h1> {course.title} </h1>
            <Paragraph ellipsis={ellipsis ? { rows: 4, expandable: false } : false}> {course.keywords} </Paragraph>
          </Row>
        </Card>
      </Link>
    </div>
  );
}

function SubjectView({ title, courses }: SubjectViewProps) {
  return (
    <div>
      <h1 className="center" style={{ fontWeight: 900, padding: 30 }}> {title} </h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, 320px)', 
        gridTemplateRows: 'repeat(auto-fill, 430px)', 
        gap: '25px', 
        justifyItems: 'center', 
        justifyContent: 'center' }}>
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
