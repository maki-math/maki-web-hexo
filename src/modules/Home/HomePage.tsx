import styled from '@emotion/styled';
import React from 'react';
import { Banner } from './components/Banner';
import { CourseView } from './components/CourseView/CourseView';
import { DailyWord } from './components/DailyWord';

const HomePageLayout = styled.div``;

export function HomePage() {
  return (
    <HomePageLayout>
      <div className="m-x_-50">
        <Banner></Banner>
      </div>
      <div className="m-x_-50">
        <DailyWord></DailyWord>
      </div>
      <CourseView></CourseView>
    </HomePageLayout>
  );
}
