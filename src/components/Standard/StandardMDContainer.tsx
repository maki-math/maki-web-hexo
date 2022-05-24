import { VditorCDN } from '@/modules/Questions/QuestionEditingPage';
import { isNotNil } from '@/utils/types';
import React, { useRef } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

export function mathFormat(text) {
  text = ' ' + text.replace(/\r\n/g, '-AAA-');
  // typora 中支持使用 \Q 来代替 \mathbb{Q}, 但 MathJax 不支持.
  text = text.replace(/\\(Q|R|C|Z|N)([^a-zA-Z])/g, '\\mathbb{$1}$2');
  // '$' 紧挨数字会被Vditor认为是货币而非公式
  text = text.replace(/([^\$])\$([^\$])/g, '$1\$ $2');
  // 给没有双$包裹的数学环境加上双$包裹, 否则 Vditor 解析后不渲染: Vditor将$...$或$$...$$识别为数学环境.
  text = text.replace(/([^\$A\-]\s*(-AAA-)*\s*?)(\\begin{(equation|align)\*?}.*?\\end{(equation|align)\*?})/g, '$1\r\n$$$$\r\n$3\r\n$$$$');
  text = text.replace(/-AAA-/g, '\r\n');
  return text;
}

export const StandardMDContainer = ({ text }: { text?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isNotNil(text) && ref.current) {
      text = mathFormat(text);
      Vditor.preview(ref.current, text, {
        math: {
          engine: "MathJax"
        },
        cdn: VditorCDN
      });
    }
  }, [ref.current]);

  return <div ref={ref} className="vditor" style={{ border: 'none' }} />;
};
