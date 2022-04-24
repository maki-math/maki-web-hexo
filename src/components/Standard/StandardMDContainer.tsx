import { isNotNil } from '@/utils/types';
import React, { useRef } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

function texFormat(text) {
  text = text.replace(/\r\n/g, '-AAAAAAAAAAAAAAAA-');
  // typora 中支持使用 \Q 来代替 \mathbb{Q}, 但 MathJax 不支持.
  text = text.replace(/\\(Q|R|C|Z|N)\s/g, '\\mathbb{$1}');
  // 给没有双$包裹的数学环境加上双$包裹, 否则不渲染
  text = text.replace(/([^\$A\-]\s*(-AAAAAAAAAAAAAAAA-)*\s*?)(\\begin{(equation|align)\*?}.*?\\end{(equation|align)\*?})/g, '$1\r\n$$$$\r\n$3\r\n$$$$');
  text = text.replace(/-AAAAAAAAAAAAAAAA-/g, '\r\n');
  return text;
}

export const StandardMDContainer = ({ text }: { text?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isNotNil(text) && ref.current) {
      text = texFormat(text);
      Vditor.preview(ref.current, text, {
        math: {
          engine: "MathJax"
        }, 
        after: () => {}
      });
    }
  }, [ref.current]);

  return <div ref={ref} className="vditor" style={{ border: 'none' }} />;
};
