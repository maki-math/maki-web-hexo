import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { Home } from '../Home/Home';

function App() {
  const [count, setCount] = useState(0);

  return <Home></Home>;
}

export default App;
