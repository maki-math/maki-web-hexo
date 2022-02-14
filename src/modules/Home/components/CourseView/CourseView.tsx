import { Card, Col, Divider, Row } from 'antd';
import React from 'react';
import { SubjectViewListMock } from './mock/SubjectViewListMock';

export interface Course {
  cover: string;
  number: string;
  slogan: string;
  title: string;
  content: string;
  url: string;
}

export interface SubjectViewProps {
  title: string;
  courses: Course[];
}

function SubjectView({ title, courses }: SubjectViewProps) {
  return (
    <div>
      <h1 className="center"> {title} </h1>
      <Row gutter={[16, 16]}>
        {courses.map(() => {
          return (
            <Col span={8}>
              <Card bodyStyle={{ height: '350px' }}>title</Card>
            </Col>
          );
        })}
      </Row>
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
