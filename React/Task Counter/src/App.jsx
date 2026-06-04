import React, { useState } from 'react';

export default function App() {
  const [counter, setCounter] = useState(1); // Starting at 1
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    const nextClicks = clicks + 1;
    setClicks(nextClicks);

    if (nextClicks % 3 === 0) {
      setCounter(prevCounter => prevCounter * 3);
    }
  };

  return (
    <div>
      <p>Counter: {counter}</p>
      <p>Clicks: {clicks}</p>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
