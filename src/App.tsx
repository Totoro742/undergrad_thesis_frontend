import React, {useState} from 'react';
import './App.css';
import Canvas from "./components/common/Canvas";
import MaterialsList from "./components/common/MaterialsList";

function App() {
    const [selectedMaterial, setSelectedMaterial] = useState<Array<string>>(["brick","orange"])
    return (
        <div className="App">
            <Canvas selectedMaterial={selectedMaterial}/>
            <MaterialsList selectedMaterial={selectedMaterial} setSelectedMaterial={setSelectedMaterial}/>
        </div>
    );
}

export default App;
