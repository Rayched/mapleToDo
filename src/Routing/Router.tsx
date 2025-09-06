import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NewDetail from "./DetailPage/Details";
import styled from "styled-components";

function Routers(){
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/charToDo" element={<NewDetail />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;