import { api } from '@/utils/api';
import OSS from 'ali-oss';
import { message } from 'antd';
import React from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

// some code in this file is adopted from https://github.com/Vanessa219/vditor/blob/master/src/ts/upload/index.ts
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

const FileSizeLimitInByte = 10 * 1024 * 1024;

const uploadToOSS = async (files: File[]) => {
  async function upload(url: string, file: File) {
    return fetch(url, {
      method: 'PUT',
      body: file,
    });
  }

  return Promise.all(
    files.map((file) => {
      const objectName = `${file.name}`;
      return api.oss
        .ossSignObjectCreate({ objectName, contentType: file.type })
        .then((res) => {
          const rawUrl = res.data.rawUrl;
          return upload(res.data.signedUrl, file).then((res) => {
            // 签过名的url有时间限制，因此加上未经过签名的url
            return { res, rawUrl, fileName: objectName };
          });
        });
    })
  );
};

export const getVditorElement = (vditor: IVditor) => {
  switch (vditor.currentMode) {
    case 'ir':
      return vditor.ir!.element;
    case 'wysiwyg':
      return vditor.wysiwyg!.element;
    case 'sv':
      return vditor.sv!.element;
  }
};

export const setSelectionFocus = (range: Range) => {
  const selection = window.getSelection()!;
  selection.removeAllRanges();
  selection.addRange(range);
};

export function VditorEditor({ id, after, input }: Props) {
  React.useEffect(() => {
    const editor: Vditor = new Vditor(id, {
      mode: 'ir',
      minHeight: 350,
      placeholder: '请输入...',
      preview: {
        math: {
          engine: 'MathJax',
        },
      },
      toolbar: ToolbarConfig,
      after: () => after?.(editor),
      input: (md) => input?.(md),
      upload: {
        url: 'this_is_not_used',
        max: FileSizeLimitInByte,
        multiple: true,
        async handler(files) {
          await uploadHandler(files);
          return null;
        },
      },
    });

    function genUploadedLabel(responseText: string, vditor: IVditor) {
      const uploadConfig = editor.vditor.upload!;
      if (!uploadConfig) return;

      const editorElement = getVditorElement(vditor);
      if (!editorElement) return;

      editorElement.focus();
      const response = JSON.parse(responseText);
      let errorTip = '';

      if (response.code === 1) {
        errorTip = `${response.msg}`;
      }

      if (response.data.errFiles && response.data.errFiles.length > 0) {
        errorTip = `<ul><li>${errorTip}</li>`;
        response.data.errFiles.forEach((data: string) => {
          const lastIndex = data.lastIndexOf('.');
          const filename =
            vditor.options.upload.filename(data.substr(0, lastIndex)) +
            data.substr(lastIndex);
          errorTip += `<li>${filename} ${window.VditorI18n.uploadError}</li>`;
        });
        errorTip += '</ul>';
      }

      if (errorTip) {
        vditor.tip.show(errorTip);
      } else {
        vditor.tip.hide();
      }

      let succFileText = '';
      Object.keys(response.data.succMap).forEach((key) => {
        const path = response.data.succMap[key];
        const lastIndex = key.lastIndexOf('.');
        let type = key.substr(lastIndex);
        const filename =
          vditor.options.upload.filename(key.substr(0, lastIndex)) + type;
        type = type.toLowerCase();
        if (
          type.indexOf('.wav') === 0 ||
          type.indexOf('.mp3') === 0 ||
          type.indexOf('.ogg') === 0
        ) {
          if (vditor.currentMode === 'wysiwyg') {
            succFileText += `<div class="vditor-wysiwyg__block" data-type="html-block"
 data-block="0"><pre><code>&lt;audio controls="controls" src="${path}"&gt;&lt;/audio&gt;</code></pre><pre class="vditor-wysiwyg__preview" data-render="1"><audio controls="controls" src="${path}"></audio></pre></div>\n`;
          } else if (vditor.currentMode === 'ir') {
            succFileText += `<audio controls="controls" src="${path}"></audio>\n`;
          } else {
            succFileText += `[${filename}](${path})\n`;
          }
        } else if (
          type.indexOf('.apng') === 0 ||
          type.indexOf('.bmp') === 0 ||
          type.indexOf('.gif') === 0 ||
          type.indexOf('.ico') === 0 ||
          type.indexOf('.cur') === 0 ||
          type.indexOf('.jpg') === 0 ||
          type.indexOf('.jpeg') === 0 ||
          type.indexOf('.jfif') === 0 ||
          type.indexOf('.pjp') === 0 ||
          type.indexOf('.pjpeg') === 0 ||
          type.indexOf('.png') === 0 ||
          type.indexOf('.svg') === 0 ||
          type.indexOf('.webp') === 0
        ) {
          if (vditor.currentMode === 'wysiwyg') {
            succFileText += `<img alt="${filename}" src="${path}">\n`;
          } else {
            succFileText += `![${filename}](${path})\n`;
          }
        } else {
          if (vditor.currentMode === 'wysiwyg') {
            succFileText += `<a href="${path}">${filename}</a>\n`;
          } else {
            succFileText += `[${filename}](${path})\n`;
          }
        }
      });
      setSelectionFocus(uploadConfig.range);
      document.execCommand('insertHTML', false, succFileText);
      uploadConfig.range = getSelection()!.getRangeAt(0).cloneRange();
    }

    function getEditorRange(vditor: IVditor) {
      let range: Range;
      const element = vditor[vditor.currentMode].element;
      if (getSelection().rangeCount > 0) {
        range = getSelection().getRangeAt(0);
        if (
          element.isEqualNode(range.startContainer) ||
          element.contains(range.startContainer)
        ) {
          return range;
        }
      }
      if (vditor[vditor.currentMode]?.range) {
        return vditor[vditor.currentMode].range;
      }
      element.focus();
      range = element.ownerDocument.createRange();
      range.setStart(element, 0);
      range.collapse(true);
      return range;
    }

    async function uploadHandler(files: File[]) {
      const uploadConfig = editor.vditor.upload!;
      if (!uploadConfig) return;
      const vditor = editor.vditor;
      if (!vditor) return;
      try {
        uploadConfig.range = getEditorRange(vditor);
        const results = await uploadToOSS(files);
        const succMap: Record<string, string> = {};
        results.forEach(({ fileName, rawUrl }) => {
          succMap[fileName] = rawUrl;
        });
        const data = {
          msg: '',
          code: 0,
          data: {
            errFiles: [],
            succMap,
          },
        };
        genUploadedLabel(JSON.stringify(data), editor.vditor);
        message.success('上传成功');
      } catch (e) {
        console.error(e);
        message.error('上传失败');
      }
    }

    function setUploadingStatus(isLoading: boolean) {
      const uploadConfig = editor.vditor.upload;
      if (!uploadConfig) return;
      const ele = getVditorElement(editor.vditor);
      if (isLoading) {
        uploadConfig.isUploading = true;
        ele.setAttribute('contenteditable', 'false');
      } else {
        uploadConfig.isUploading = false;
        ele.setAttribute('contenteditable', 'true');
      }
    }

    return () => {
      editor.destroy();
    };
  }, []);

  return <div id={id} className="vditor edit" />;
}
