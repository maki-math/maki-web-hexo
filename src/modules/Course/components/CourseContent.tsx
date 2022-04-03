import React from 'react';
import { useHistory } from 'react-router-dom';
import { Tree } from 'antd';
import Course from '../Home/components/CourseView/CourseView';

export function CourseContent({ course }: Course) {
  const history = useHistory();

  const onSelect = (selectedKeys: React.Key[], e: any) => {
    const articleId = e.node.articleId;
    const path = {
      pathname: '/content',
      state: { course: course, articleId: articleId },
    };
    history.push(path);
  };

  return (
    <Tree
      style={{ background: '#f0f2f5' }}
      blockNode
      onSelect={onSelect}
      defaultExpandAll={false}
      treeData={course.contents}
    />
  );
}

export default CourseContent;
