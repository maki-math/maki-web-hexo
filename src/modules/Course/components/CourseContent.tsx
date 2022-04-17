import React from 'react';
import { useHistory } from 'react-router-dom';
import { Tree } from 'antd';
import { CourseModel } from '@/generated-api/Api';

interface Props {
  course: CourseModel;
}

export function CourseContent({ course }: Props) {
  const history = useHistory();

  const onSelect = (selectedKeys: React.Key[], e: any) => {
    const articleId = e.node.articleId;
    const path = {
      pathname: '/content',
      state: { course: course, articleId: articleId },
    };
    history.push(path);
  };

  // FIXME: 修复treeData传参的类型错误

  return (
    <Tree
      style={{ minWidth: '600px' }}
      blockNode
      onSelect={onSelect}
      defaultExpandAll={true}
      treeData={[ course.contents??{} ]}
    />
  );
}
