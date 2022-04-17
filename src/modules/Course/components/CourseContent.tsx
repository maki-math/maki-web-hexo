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
    const articleId = e.node.id;
    const path = {
      pathname: `/content/${articleId}`,
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
      // @ts-expect-error antd不支持根据fieldNames推导treeData可拥有的类型。它要求有key字段
      treeData={[course.contents]}
      fieldNames={{ title: 'label', key: 'id' }}
    />
  );
}
