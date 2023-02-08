import axios from 'axios';
import dayjs from 'dayjs';

// TODO use real UserProfile definition
type UserProfile = any;

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
export interface DiaryCreatePayload {
  items: DailyRecordType[];
  author: { id: number };
}

export interface DiaryListQueryPayload {
  /**
   * 不传表示查询所有人
   */
  wechatInternalId: string | undefined;
  timeRange: 'week' | 'day';
  /**
   * wechatInternalId和userId二选一即可
   */
  userId: number | undefined;
}

export type TimeString = string & { tag?: 'TimeString' };
export function humanizeTimeString(timeString: TimeString) {
  return dayjs(timeString).format('dddd YYYY-MM-DD HH:mm:ss');
}

export interface DiaryItem {
  items: DailyRecordType[];
  author: UserProfile;
  createdAt: TimeString;
  updatedAt: TimeString;
  id: number;
}

export const diary = {
  create(payload: DiaryCreatePayload) {
    return axios.post<typeof payload, DiaryItem>(`/diary/`, payload);
  },
  queryList(payload: DiaryListQueryPayload) {
    return axios.get<typeof payload, DiaryItem[]>(`/diary/`, {
      params: payload,
    });
  },
};
