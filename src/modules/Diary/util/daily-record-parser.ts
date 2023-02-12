export type ParsedRecord = { record: string[] };
export type UnparsedLine = string;
export type DailyRecordParseResult = {
  parsed: DailyRecordType[];
  unparsed: UnparsedLine[];
};

// TODO use enum
export type DailyRecordType = {
  action: string;
  objectName: string;
  annotation: string | undefined;
  unit: string;
  quant: string;
  objectType: string;
  isIgnored?: boolean;
};

export function parseDailyRecord(s: string): DailyRecordParseResult {
  /* eslint-disable no-useless-escape */
  const DailyRecordPattern = /(?<action>编写|讲授|学习|挑错|讨论|刷题|绘制|阅读|练习)(?<objectName>.*?)(?<objectType>讲义|习题集|课程|习题课|讲座|解题指南|笔记|词条|插图|书|文献)\s*[:：]\s*(?<quant>[\d\.]+)(?<unit>[^（]*)(:?[（(](?<annotation>已完成)[)）])?/;
  /* eslint-enable no-useless-escape */
  const lines = s.split('\n');
  const result: DailyRecordType[] = [];
  const unparsed: UnparsedLine[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    const groups = DailyRecordPattern.exec(trimmed)?.groups as
      | DailyRecordType
      | undefined;
    if (groups) {
      const { annotation } = groups;
      const isIgnored = annotation?.includes('已完成');
      result.push({ ...groups, isIgnored });
    } else if (!isTemplateLine(line)) {
      unparsed.push(line);
    }
  }
  return {
    parsed: result,
    unparsed,
  };
}

function isTemplateLine(s: string) {
  return s.includes('日拱一卒');
}
