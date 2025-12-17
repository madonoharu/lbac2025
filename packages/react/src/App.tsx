import { useEffect, useState } from "react";

import Cell from "./Cell";
import { createUniverse } from "./lib";

function App() {
  const [universe, setUniverse] = useState(() => createUniverse(1000));
  const [fps, setFps] = useState("");

  useEffect(() => {
    const f = async () => {
      const next = await universe.update();
      setUniverse(next);
      setFps(next.fps.display());
    };

    f();
  }, [universe]);

  return (
    <div className="app">
      <div className="container">
        <p>{fps}</p>
        {universe.list.map((dot) => (
          <Cell key={dot.id} dot={dot} />
        ))}
      </div>
    </div>
  );
}

export default App;
