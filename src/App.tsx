import React, {useState} from 'react';
import './App.css';
import Canvas from "./components/common/Canvas";
import MaterialsList from "./components/common/MaterialsList";
import {AppBar, createTheme, Grid} from '@mui/material';
import {IMaterial} from "./models/IMaterials";

function App() {

    //TODO: create theme
    const theme = createTheme({})

    const [selectedMaterial, setSelectedMaterial] = useState<IMaterial | null>(null)

    return (
        <div className="App">
            <Grid direction="row">
                <AppBar>
                    App
                    {/*<img src="%PUBLIC_URL%/logo.png" alt="Logo"/>*/}
                </AppBar>
            <Canvas selectedMaterial={selectedMaterial}/>
            <MaterialsList selectedMaterial={selectedMaterial} setSelectedMaterial={setSelectedMaterial}/>
            {/*<Button variant="contained" onClick={handleCalculate}>Calculate</Button>*/}
            </Grid>
        </div>
    );
}

export default App;
