import { StarFilled, StarOutlined } from '@/components/Icon/Icon';
import { PageHeader, Button, Layout } from 'antd';
import React, { useState } from 'react';
import { routes } from './mock';

const { Content } = Layout;

const FavoriteSwitchButton: React.FC<{ isFavorite?: boolean }> = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <Button
      shape="circle"
      icon={
        isFavorite ? (
          <StarFilled style={{ color: 'var(--yellow-6)' }} />
        ) : (
          <StarOutlined></StarOutlined>
        )
      }
      onClick={() => setIsFavorite((x) => !x)}
    ></Button>
  );
};

export const PostDisplay: React.FC<unknown> = (props) => {
  return (
    <PageHeader
      ghost={false}
      breadcrumb={{ routes }}
      title="Title"
      subTitle="This is a subtitle"
      extra={[<FavoriteSwitchButton key={1} />]}
      className="h-full"
    >
      <Content>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure laboriosam
        impedit eaque, dolor adipisci saepe accusantium aut. Quis natus ipsum
        ea, quibusdam porro eligendi vero reiciendis voluptatibus, provident
        excepturi velit? Ipsam deserunt explicabo quia molestias, itaque, optio
        exercitationem aut, autem reiciendis dicta corporis. Officiis deserunt
        optio velit, eligendi consectetur rerum! Deleniti quod nisi, tempora
        harum at rem veniam error facere. Eaque modi earum tenetur nihil dolor
        eum, perferendis doloremque vero similique enim magnam nobis maxime
        nesciunt ab. Voluptate, eius architecto sit magni, dolorem excepturi
        illo veniam nam expedita cupiditate asperiores? Numquam excepturi,
        impedit deserunt consectetur nisi officiis sapiente quam voluptate omnis
        blanditiis nemo incidunt, quia neque ea adipisci vitae ex eius in
        tempore, necessitatibus magnam alias culpa! Aut, velit iusto! Aut
        aliquid, architecto et quidem tempora cumque molestiae dolores pariatur
        harum rerum quasi hic! Non, et. Cupiditate omnis reiciendis delectus.
        Molestias tempora, enim laboriosam veniam ullam quae laborum dolor
        magnam.
      </Content>
    </PageHeader>
  );
};
