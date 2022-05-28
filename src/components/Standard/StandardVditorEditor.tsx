import React from 'react';
import 'vditor/dist/index.css';
import Vditor from 'vditor';

interface Props {
  id: string;
  after?: () => void;
  input?: () => void;
}

export function VditorEditor ({id, after, input}: Props) {
  React.useEffect(() => {
      const vditor = new Vditor(id, {
        mode: 'ir',
        minHeight: 150,
        placeholder: '请输入...',
        preview: {
          math: {
            engine: "MathJax"
          }
        },
        after: () => after?.(vditor),
        input: (md) => input?.(md)
      });
  }, []);

  return <div id={id} className="vditor edit"/>;
}