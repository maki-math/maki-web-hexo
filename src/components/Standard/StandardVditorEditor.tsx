import React from 'react';
import 'vditor/dist/index.css';
import Vditor from 'vditor';

interface Props {
  id: string;
  after?: (v: Vditor) => void;
  input?: (x: string) => void;
}

// default config from https://github.com/Vanessa219/vditor/blob/master/src/ts/util/Options.ts
const ToolbarConfig = [
  'emoji',
  'headings',
  'bold',
  'italic',
  'strike',
  'link',
  '|',
  'list',
  'ordered-list',
  'check',
  'outdent',
  'indent',
  '|',
  'quote',
  'line',
  'code',
  'inline-code',
  'insert-before',
  'insert-after',
  '|',
  'upload',
  // 'record',
  'table',
  '|',
  'undo',
  'redo',
  '|',
  'fullscreen',
  'edit-mode',
  {
    name: 'more',
    toolbar: [
      // 'both',
      // 'code-theme',
      // 'content-theme',
      'export',
      'outline',
      'preview',
      // 'devtools',
      // 'info',
      // 'help',
    ],
  },
];

export function VditorEditor({ id, after, input }: Props) {
  React.useEffect(() => {
    const vditor: Vditor = new Vditor(id, {
      mode: 'ir',
      minHeight: 350,
      placeholder: '请输入...',
      preview: {
        math: {
          engine: 'MathJax',
        },
      },
      toolbar: ToolbarConfig,
      after: () => after?.(vditor),
      input: (md) => input?.(md),
    });
    return () => {
      vditor.destroy();
    };
  }, []);

  return <div id={id} className="vditor edit" />;
}
