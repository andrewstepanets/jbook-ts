import * as esbuild from 'esbuild-wasm';
import { FC, useState, useEffect, useRef } from 'react';

const App: FC = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    ref.current = await esbuild
      .initialize({
        worker: true,
        wasmURL: '/esbuild.wasm',
      })
      .then(() => esbuild);
  };
  useEffect(() => {
    startService();
  }, []);

  const onClick = () => {
    if (!ref.current) {
      return;
    }
    console.log(ref.current);
  };
  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

export default App;
