import React from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import {pagesRouter} from "./routes";
import {Container} from "@mui/material";

function App() {
    return (
        <Container sx={{
            mt: 3
        }}>
            <RouterProvider router={pagesRouter}/>
        </Container>
    );
}

export default App;
