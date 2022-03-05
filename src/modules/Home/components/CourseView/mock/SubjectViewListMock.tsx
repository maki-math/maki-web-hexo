
import { SubjectViewProps } from '../CourseView';

export const SubjectViewListMock: SubjectViewProps[] = [
  {
    title: '数学 Mathematics',
    courses: ','.repeat(8).split('').map( a=> 
      [{ 
        title: '数学分析(I)', 
        cover: 'http://t15.baidu.com/it/u=2155981960,1731805429&fm=224&app=112&f=JPEG?w=333&h=500', 
        number: 'MAT1A10', 
        description: '数学专业基础课程',
        keywords: '极限， 微分， 积分，曲线、曲面积分。 极限， 微分， 积分，曲线、曲面积分。 ',
        class: '分析',
        url: '/courses'
      }][0]
    )
  },
  {
    title: '物理 Physics',
    courses: ','.repeat(8).split('').map( a=> 
      [{ 
        title: '数学物理方法', 
        cover: 'https://img14.360buyimg.com/pop/g13/M03/0E/11/rBEhUlJLjDMIAAAAAAB5EAJDthsAADvGwPmZ7cAAHko724.jpg', 
        number: 'PHY1C10', 
        description: '数学物理必修课程',
        keywords: '波动方程， 热传导方程，椭圆形， 抛物型方程',
        class: '数理方程',
        url: '/courses'
      }][0]
    ),
  },
  {
    title: '化学 Chemistry',
    courses: ','.repeat(8).split('').map( a=> 
      [{ 
        title: '化学原理', 
        cover: 'https://img1.baidu.com/it/u=1024620522,4064709841&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=640', 
        number: 'CHM1A10', 
        description: '化学专业必修课程',
        keywords: '原子、分子结构, 气体，分子动理论, 液体，蒸汽压，溶液依数性... ',
        class: '化学',
        url: '/courses'
      }][0]
    ),
  },
  {
    title: '计算机 Computer Science',
    courses: ','.repeat(8).split('').map( a=> 
      [{ 
        title: '计算机程序的构造与解释', 
        cover: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-1a573cd7a1b01cfdbb7c7f4498d4a4e9_b.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648122963&t=8fd36ab6b863e31baeb3f8548657d8d4', 
        number: 'CST1B10', 
        description: '“魔法书”-SICP',
        keywords: '计算机科学的核心概念，包括抽象、递归、解释器以及元语言抽象',
        class: '程序',
        url: '/courses'
      }][0]
    )
  },
];