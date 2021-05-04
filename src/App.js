import React from "react";
import DevicesComponent from "./components/DevicesComponent";
import FirmwaresComponent from "./components/FirmwaresComponent";

function App() {
  return (
    <div className="App">
        <p>
            <h1>Devices</h1>
            <DevicesComponent/>
        </p>
        <p>
            <h1>Firmwares</h1>
            <FirmwaresComponent/>
        </p>
    </div>
  );
}

export default App;
