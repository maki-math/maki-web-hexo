import { CourseDetailProps } from '../Details';

// https://dubuqian.cn/courses/cst1b10/
export const CourseDetailMock: CourseDetailProps = {
  course: { 
        title: '计算机程序的构造与解释', 
        cover: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/SICP_cover.jpg', 
        number: 'CST1B10', 
        description: '“魔法书”-SICP',
        content: '计算机科学的核心概念，包括抽象、递归、解释器以及元语言抽象',
        class: '程序',
        url: '/courses'
  },
  details: {
    teacher: '独不迁',
    photo: 'https://dubuqian.cn/public/favicon.ico',
    contact: 'dubuqian@outlook.com',
    book: 'The Structure and Interpretation of Computer Programs, 2nd Edition, MIT Press',
    requirement: '无',
    introduction: '倘若大家对 SICP 有所耳闻，也一定对它 “魔法书” 的称号有所了解，书中将编写程序当作是自己写作魔力去控制计算机中的精灵。从这本书的封面，到作者的引言，都充满了生趣——是的，我使用了生趣一词。可能在诸多的误传中，SICP 被描述成了一部极难理解的作品，但这种观点毫无疑问是错误的。在之前的 MIT，这本书不过是大一电气工程和计算机科学专业的必修课。作者笔调轻盈，语言幽默典雅，是不可多得的佳品。它更是可以大幅提高我们对大型项目的掌握能力，让我们面对卷帙浩繁的程序知道如何下手理解；对我们编写大型项目也是大有裨益；随着对程序设计语言的深入挖掘，我们对程序设计语言的理解也会深入恳綮。',
    content: [
      ['Chap 1.', [ {section: '1.1', url: '/section/1'}, {section: '1.2', url: '/section/2'}, {section: '1.3', url: '/section/3'} ]],
      ['Chap 2.', [ {section: '2.1', url: '/section/1'}, {section: '2.2', url: '/section/2'}, {section: '2.3', url: '/section/3'} ]],
      ['Chap 3.', [ {section: '3.1', url: '/section/1'}, {section: '3.2', url: '/section/2'}, {section: '3.3', url: '/section/3'} ]],
      ['Chap 4.', [ {section: '4.1', url: '/section/1'}, {section: '4.2', url: '/section/2'}, {section: '4.3', url: '/section/3'} ]]
    ],
    attachment: [
      {
        name: '第一节：导论与糙快猛 Racket 入门 （简体中文）',
        url: 'a.pdf'
      },
      {
        name: '第二节：导论与糙快猛 Racket 入门 （简体中文）',
        url: 'b.pdf'
      }
    ],
    homework: [
      {
        name: '第一节：作业',
        url: 'c.pdf'
      },
      {
        name: '第二节：作业',
        url: 'd.pdf'
      }
    ]
  }
}