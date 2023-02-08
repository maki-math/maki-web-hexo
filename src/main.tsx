import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import * as weekday from 'dayjs/plugin/weekday';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './modules/App/App';
import './styles/index.less';

function configDayJs() {
  dayjs.extend(weekday);
  dayjs.locale('zh-cn');
}

configDayJs();

const root = createRoot(document.getElementById('root')!);
root.render(<App></App>);
