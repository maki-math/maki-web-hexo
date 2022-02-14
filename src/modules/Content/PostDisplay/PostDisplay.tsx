import { StarFilled, StarOutlined } from '@/components/Icon/Icon';
import { PageHeader, Button, Layout } from 'antd';
import React, { useState } from 'react';
import { routes } from './mock';
import test_pdf from '@/assets/files/basic.pdf';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

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
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

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
      <div>
          <Document file={test_pdf} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            <Page style={{ border: '2px solid gray !important', boxShadow: "2px red" }} pageNumber={pageNumber} />
            <Page style={{ border: '2px solid gray !important', boxShadow: "2px red" }} pageNumber={pageNumber + 1} />
            <Page style={{ border: '2px solid gray !important', boxShadow: "2px red" }} pageNumber={pageNumber + 2} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
    </PageHeader>
  );
};
