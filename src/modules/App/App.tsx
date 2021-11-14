import { Button } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Button onClick={() => setCount((count) => count + 1)}>
        count is: {count}
      </Button>
    </div>
  );
}

export default App;
