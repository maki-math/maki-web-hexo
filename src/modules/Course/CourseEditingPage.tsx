import { StandardPageLayout } from '@/components/Standard/StandardPageLayout';
import { VditorEditor } from '@/components/Standard/StandardVditorEditor';
import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import { 
  Form, Input, Button, message, Skeleton, 
  Col, Row, Row, Select, Upload, Image, Space,
} from 'antd';
import { CourseModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import { useForm } from 'antd/lib/form/Form';
import { useHistory } from 'react-router-dom';
import { mathFormat } from '@/components/Standard/StandardMDContainer';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Option } = Select;
export const VditorCDN = 'https://beta.maki-math.com/static/vditor@3.8.13';

const UploadImage = ({setCover, cover}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(cover);
  const [visible, setVisible] = useState(false);

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    // Todo: upload image to OSS.
    // if (info.file.status === 'uploading') {
    //   setLoading(true);
    //   return;
    // }
    // if (info.file.status === 'done') {
      setCover('https://ts1.cn.mm.bing.net/th/id/R-C.bf02bdf2f0cab9eda5fef9d56d98aa0a?rik=yh3AkOUSzh96ZQ&pid=ImgRaw&r=0');
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false);
        setImageUrl(url);
      });
    // }
  };

  return <Space direction="vertical" align="center">
    <Upload
      name="cover"
      showUploadList={false}
      action=""
      onChange={handleChange}
    >
      <Button icon={<UploadOutlined />}>点击上传封面</Button>
    </Upload>
    <Image
      preview={{ visible: false }}
      height={215}
      width={150}
      src={imageUrl}
      fallback="data:image/png;base64,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"
      onClick={() => imageUrl && setVisible(true)}
    />
    <div style={{ display: 'none' }}>
      <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
        <Image src={imageUrl} />
      </Image.PreviewGroup>
    </div>
  </Space>
};

function CourseEditing({ course }: { course: CourseModel }) {
  if (typeof course.category === 'object') {
    course.category = course.category[0] ? course.category[0].alias : '';
  }
  const { data } = useRequest(api.courseGallery.courseGalleryList);
  const courseGallery = data?.data ?? [];
  const [ cover, setCover ] = useState(course.cover);
  const course_keys_alias = [
    { name: 'category', alias: '课程分类'},
    { name: 'cover', alias: '课程封面'},
    { name: 'title', alias: '课程名称' },
    { name: 'teacher', alias: '授课老师' },
    { name: 'contact', alias: '联系方式' },
    { name: 'courseCode', alias: '课程代码' },
    { name: 'keywords', alias: ' 关 键 词 ' },
    { name: 'shortDescription', alias: '简短描述' },
    { name: 'description', alias: '详细描述' },
  ];
  const course_id = course.id;
  const history = useHistory();

  const beforeUpload = (course: CourseModel) => {
    course.cover = cover;
    for (const item of course_keys_alias) {
      if (course[item.name] === '') {
        message.error(item.alias + '不能为空!');
        return;
      }
    }
    const category = courseGallery.filter( cg => cg.categoryAlias === course.category)[0];
    course.category = {
      id: category.categoryId,
      alias: category.categoryAlias,
      name: category.category
    };
    run(course);
  };

  const uploadCourse = (course: CourseModel) => {
    (course_id
      ? api.courses.coursesUpdate(course_id, course)
      : api.courses.coursesCreate(course)
    )
      .then((res) => {
        const path = {
          pathname: `/courses/${res.data.id}`,
        };
        message.success('上传成功');
        history.push(path);
      })
      .catch((err) => {
        message.error('上传失败, 请稍后重试.');
      });
  };
  const { loading, run } = useRequest(uploadCourse, { manual: true });

  type CourseFormData = CourseModel;
  const [form] = useForm<CourseFormData>();

  return (
    <StandardPageLayout title="课程编辑">
      <Form
        initialValues={course}
        form={form}
        onFinish={(values) => beforeUpload(values)}
      >
        <Row>
          <Col span={19}>
            <Form.Item name='category' label='课程分类' key={0}>
              <Select allowClear>
                {
                  courseGallery.map( cg => 
                    <Option 
                      key={cg.categoryId} 
                      value={cg.categoryAlias}
                    >
                      {cg.categoryAlias}
                    </Option>
                  )
                }
              </Select>
            </Form.Item>

            {course_keys_alias.slice(2, 6).map((item, index) => (
              <Form.Item name={item.name} label={item.alias} key={index}>
                <Input />
              </Form.Item>
            ))}{' '}
          </Col>
          <Col span={4} offset={1}>
            <UploadImage setCover={setCover} cover={cover}/>
          </Col>
        </Row>
        {course_keys_alias.slice(6, 8).map((item, index) => (
          <Form.Item name={item.name} label={item.alias} key={index}>
            <Input />
          </Form.Item>
        ))}{' '}
        {course_keys_alias.slice(8).map((item, index) => (
          <Form.Item name={item.name} label={item.alias} key={index} hidden>
            <Input />
          </Form.Item>
        ))}{' '}
        {course_keys_alias.slice(8).map((item, index) => (
          <Form.Item label={item.alias} key={index}>
            {VditorEditor({
              id: 'vditor' + item.name,
              after: (vditor) => {
                const md = mathFormat(course[item.name]);
                vditor.setValue(md);
              },
              input: (md) => {
                const field = {};
                field[item.name] = md;
                form.setFieldsValue(field);
              },
              cdn: VditorCDN,
            })}
          </Form.Item>
        ))}
        <Form.Item>
          <Row justify="center">
            <Col>
              <Button type="primary" htmlType="submit" disabled={loading}>
                {loading ? '上传中' : '上传'}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </StandardPageLayout>
  );
}

export const CourseEditingPage = ({ id }: { id: number }) => {
  let course;
  if (id > 0) {
    const { data, loading } = useRequest(
      () => {
        return api.courses.coursesRetrieve(id);
      },
      { refreshDeps: [id] }
    );
    course = data?.data;
  } else {
    course = {
      category: '',
      title: '',
      teacher: '',
      contact: '',
      courseCode: '',
      cover: '',
      keywords: '',
      shortDescription: '',
      description: '',
    };
  }
  return (
    <Skeleton
      avatar
      active
      title={false}
      paragraph={{ rows: 18 }}
      loading={!course}
    >
      <CourseEditing course={course} />
    </Skeleton>
  );
};
