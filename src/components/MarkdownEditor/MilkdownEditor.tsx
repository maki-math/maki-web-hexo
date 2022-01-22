// https://github.com/Saul-Mirone/milkdown/blob/main/gh-pages/component/MilkdownEditor/MilkdownEditor.tsx
import { editorViewCtx, parserCtx } from '@milkdown/core';
import { Slice } from '@milkdown/prose';
import { EditorRef, ReactEditor, useEditor } from '@milkdown/react';
import React, { forwardRef } from 'react';
import { createEditor } from './createEditor';
import { MilkdownContentType, useLazy } from './useLazy';

type Props = {
  content: MilkdownContentType;
  readOnly?: boolean;
  onChange?: (markdown: string) => void;
};

export type MilkdownRef = { update: (markdown: string) => void };
export const MilkdownEditor = forwardRef<MilkdownRef, Props>(
  ({ content, readOnly, onChange }, ref) => {
    const editorRef = React.useRef<EditorRef>(null);
    const [editorReady, setEditorReady] = React.useState(false);

    const [loading, md] = useLazy(content);

    React.useImperativeHandle(ref, () => ({
      update: (markdown: string) => {
        if (!editorReady || !editorRef.current) return;
        const editor = editorRef.current.get();
        if (!editor) return;
        editor.action((ctx) => {
          const view = ctx.get(editorViewCtx);
          const parser = ctx.get(parserCtx);
          const doc = parser(markdown);
          if (!doc) return;
          const state = view.state;
          view.dispatch(
            state.tr.replace(
              0,
              state.doc.content.size,
              new Slice(doc.content, 0, 0)
            )
          );
        });
      },
    }));

    const editor = useEditor(
      (root) => createEditor(root, md, readOnly, setEditorReady, onChange),
      [readOnly, md, onChange]
    );

    return (
      <div>
        {loading ? (
          // TODO 加入加载动画
          <>loading...</>
        ) : (
          <ReactEditor ref={editorRef} editor={editor} />
        )}
      </div>
    );
  }
);
