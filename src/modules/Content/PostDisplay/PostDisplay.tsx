import { api } from '@/utils/api';
import { useRequest } from 'ahooks';
import { Layout, PageHeader, Skeleton } from 'antd';
import React from 'react';

const { Content } = Layout;

// TODO: 实现收藏功能
// const FavoriteSwitchButton: React.FC<{ isFavorite?: boolean }> = (props) => {
//   const [isFavorite, setIsFavorite] = useState(false);
//   return (
//     <Button
//       shape="circle"
//       icon={
//         isFavorite ? (
//           <StarFilled style={{ color: 'var(--yellow-6)' }} />
//         ) : (
//           <StarOutlined></StarOutlined>
//         )
//       }
//       onClick={() => setIsFavorite((x) => !x)}
//     ></Button>
//   );
// };

interface Props {
  articleId: string | undefined;
}

export const ArticleDisplay = ({ articleId }: Props) => {
  const { data, loading } = useRequest(
    async () => {
      if (articleId) {
        return api.article.articleRetrieve(Number(articleId));
      }
      return undefined;
    },
    { refreshDeps: [articleId] }
  );

  const article = data?.data;

  const mdContent = article?.content;

  return (
    <PageHeader
      ghost={false}
      title={article?.title}
      subTitle={article?.course.title}
      className="h-full"
      onBack={() => window.history.back()}
    >
      <Content>
        <Skeleton active loading={loading}>
          {mdContent}
        </Skeleton>
      </Content>
    </PageHeader>
  );
};
