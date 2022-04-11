import { splitTagsString } from '@/utils/tags';
import { Tag } from 'antd';
import React from 'react';

interface Props {
  tags: string | string[];
}
export function TagsDisplay({ tags }: Props) {
  const tagList = typeof tags === 'string' ? splitTagsString(tags) : tags;
  return (
    <div>
      {tagList.map((tag, index) => {
        return <Tag key={index}>{tag}</Tag>;
      })}
    </div>
  );
}
