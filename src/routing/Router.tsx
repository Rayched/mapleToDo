import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NewDetail from "./DetailPage/Details";

function Routers(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/charToDo" element={<NewDetail />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;