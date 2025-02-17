import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routing/Home";
import Detail from "./routing/Detail";

function Routers(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/charToDo" element={<Detail />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;