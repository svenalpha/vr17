import { useState } from 'react';

//x const App = () => {
const App = ({ data }) => {   //x 
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>App</h1>
      <p>Lorem Ipsum</p>
      <h3> vr17.....no.3......06:14.....24/05/2024 </h3>
      <div>
        <div>{count}</div>
        <button onClick={() => setCount(count + 1)}>Count</button>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre> //x
    </main>
  );
};

export default App;
