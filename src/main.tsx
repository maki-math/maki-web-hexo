import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './modules/App/App';
import './styles/index.less';

const root = createRoot(document.getElementById('root')!);
root.render(<App></App>);
