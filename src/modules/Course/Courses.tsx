import React, { useState } from 'react';
import { Table, Tag, Space } from 'antd';
import { useLocation, useHistory, Link } from 'react-router-dom';

var isloaded = false;
var courses = [], setCourses;

export function Courses() {
  if( !isloaded ) {
    [courses, setCourses] = useState([]);
    fetch('http://39.107.28.170/api/course_gallery')
      .then((x) => x.json())
      .then( x => {
        x = x.map( x => x.courses ).flat().map( x => {
          x.category = x.category[0].alias;
          return x;
        });
        setCourses(x)
        console.log(x)
        isloaded = true;
      })
      .catch((e) => {
        return [];
      });
  }

  const columns = [
    {
      title: '课程名称',
      dataIndex: 'title',
      key: 'title',
      render: title => {
        const path = { pathname: '/content', state: { title: title } };
        return <Link to={path}>{title}</Link> 
      }
    },
    {
      title: '学科分类',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '授课老师',
      dataIndex: 'teacher',
      key: 'teacher',
    }
  ];
  
  

  return (
    <Table columns={columns} dataSource={courses} />
  );
}
