import uploadImage from '@/assets/uploadimage.jpeg';
import { mathFormat } from '@/components/Standard/StandardMDContainer';
import { StandardPageLayout } from '@/components/Standard/StandardPageLayout';
import {
  uploadToOSS,
  VditorEditor,
} from '@/components/Standard/StandardVditorEditor';
import { CourseCategoryModel, CourseModel } from '@/generated-api/Api';
import { api } from '@/utils/api';
import { UploadOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Image,
  Input,
  message,
  Row,
  Skeleton,
  Space,
  Upload,
} from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const VditorCDN = 'https://beta.maki-math.com/static/vditor@3.8.13';

const UploadImage = ({ setCover, cover }) => {
  const [_, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(cover);
  const [visible, setVisible] = useState(false);

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
    uploadToOSS([info.file.originFileObj])
      .then((res) => {
        setCover(res[0].rawUrl);
      })
      .catch(() => {
        message.error('图片上传失败, 请重试');
      });
  };

  return (
    <Space direction="vertical" align="center">
      <Upload
        name="cover"
        showUploadList={false}
        accept="image/*"
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
        fallback={uploadImage}
        onClick={() => imageUrl && setVisible(true)}
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
        >
          <Image src={imageUrl} />
        </Image.PreviewGroup>
      </div>
    </Space>
  );
};

function CourseEditing({
  course,
  courseCategories,
}: {
  course: CourseModel;
  courseCategories: CourseCategoryModel[];
}) {
  if (course.category?.[0]?.name) {
    course.category = course.category.map((cg) => cg.alias);
  }

  const [cover, setCover] = useState(course.cover);
  const course_keys_alias = [
    { name: 'cover', alias: '课程封面' },
    { name: 'title', alias: '课程名称' },
    { name: 'teacher', alias: '授课老师' },
    { name: 'contact', alias: '联系方式' },
    { name: 'courseCode', alias: '课程代码' },
    { name: 'keywords', alias: 'ㅤ关键词' },
    { name: 'shortDescription', alias: '简短描述' },
    { name: 'description', alias: '详细描述' },
  ];
  const course_id = course.id;
  const history = useHistory();

  const beforeUpload = (course: CourseModel) => {
    course.cover = cover;
    if (course.description === '\n') {
      course.description = '';
    }
    if (course.category.length === 0) {
      message.error('请选择课程分类');
      return;
    }
    for (const item of course_keys_alias) {
      if (course[item.name].trim() === '') {
        message.error(item.alias + '不能为空!');
        return;
      }
    }
    const category = courseCategories.filter((cc) =>
      course.category.includes(cc.alias)
    );
    course.category = category;
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
      .catch(() => {
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
            <Form.Item name="category" label="课程分类">
              <Checkbox.Group style={{ width: '100%' }}>
                <Row>
                  {courseCategories.map((cc) => (
                    <Col span={3}>
                      <Checkbox key={cc.id} value={cc.alias}>
                        {cc.alias}
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>

            {course_keys_alias.slice(1, 5).map((item, index) => (
              <Form.Item name={item.name} label={item.alias} key={index}>
                <Input />
              </Form.Item>
            ))}
          </Col>
          <Col span={4} offset={1}>
            <UploadImage setCover={setCover} cover={cover} />
          </Col>
        </Row>
        {course_keys_alias.slice(5, 7).map((item, index) => (
          <Form.Item name={item.name} label={item.alias} key={index}>
            <Input />
          </Form.Item>
        ))}
        {course_keys_alias.slice(7).map((item, index) => (
          <Form.Item name={item.name} label={item.alias} key={index} hidden>
            <Input />
          </Form.Item>
        ))}
        {course_keys_alias.slice(7).map((item, index) => (
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
              <Space direction="horizontal">
                <Button type="primary" htmlType="submit" disabled={loading}>
                  上传
                </Button>
                <Button
                  disabled={loading}
                  onClick={() => window.history.back()}
                >
                  取消
                </Button>
              </Space>
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
    const { data } = useRequest(
      () => {
        return api.courses.coursesRetrieve(id);
      },
      { refreshDeps: [id] }
    );
    course = data?.data;
  } else {
    course = {
      category: [],
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
  const { data: data2 } = useRequest(api.courseCategories.courseCategoriesList);
  const courseCategories = data2?.data;

  return (
    <Skeleton
      avatar
      active
      title={false}
      paragraph={{ rows: 18 }}
      loading={!course || !courseCategories}
    >
      <CourseEditing course={course} courseCategories={courseCategories} />
    </Skeleton>
  );
};
