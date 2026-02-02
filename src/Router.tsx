
import styled from "styled-components";
import CharToDosPage from "./Routing/addtodos/Page";
import Home from "./Routing/Home";
import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router-dom";
import Details from "./Routing/DetailPage/Details";

export default function Routers(){
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route 
                    path="/chartodos" 
                    element={<Details />}
                />
            </Routes>
        </BrowserRouter>
    );
};