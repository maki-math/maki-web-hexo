import { api } from '@/utils/api';
import { isNotNil } from '@/utils/types';
import { useRequest } from 'ahooks';
import { Layout, PageHeader, Skeleton } from 'antd';
import React, { useRef } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

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

const MDContainer = ({ text }: { text?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isNotNil(text) && ref.current) {
      Vditor.preview(ref.current, text);
    }
  }, [ref.current]);

  return <div ref={ref} className="vditor" style={{ border: 'none' }} />;
};

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
          <MDContainer text={mdContent} />
        </Skeleton>
      </Content>
    </PageHeader>
  );
};
