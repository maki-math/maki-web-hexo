import { isNotNil } from '@/utils/types';
import React, { useRef } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

export const StandardMDContainer = ({ text }: { text?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isNotNil(text) && ref.current) {
      Vditor.preview(ref.current, text, {
      	math: {
          engine: 'MathJax'
      	},
        after: () => window?.MathJax?.loader?.ready?.()
          ?.then( () => window.MathJax.typeset([document.body]) )
      });
    }
  }, [ref.current]);

  return <div ref={ref} className="vditor" style={{ border: 'none' }} />;
};
