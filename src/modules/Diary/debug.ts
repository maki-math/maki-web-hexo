import { DailyRecordType, DiaryItem, humanizeTimeString } from './api/diary';

export function safeJsonStringify<T>(v: T) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '';
  }
}

function prettifyDiary({
  action,
  annotation,
  objectName,
  objectType,
  quant,
  unit,
}: DailyRecordType) {
  const text = `${action}${objectName}${objectType}: ${quant}${unit}`;
  if (annotation) {
    return `${text}(${annotation})`;
  }
  return text;
}

export function formatDailyRecords(records: DailyRecordType[]) {
  if (records.length) {
    return records.map((x) => prettifyDiary(x)).join('\n');
  }
  return '本日内容为空';
}

export function prettifyDiaryItems(diaryItems: DiaryItem[]) {
  function header() {
    return '';
  }

  function body() {
    function formatItem(x: DiaryItem) {
      const author = x.author.user.username;
      const time = humanizeTimeString(x.updatedAt);
      return `${author}\n[${time}]\n${formatDailyRecords(x.items)}`;
    }
    return `${diaryItems.map(formatItem).join(' \n')}`;
  }
  const res = `${header()}${body()}` || '记录为空';
  return res;
}
