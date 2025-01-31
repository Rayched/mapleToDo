import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import ToDoList from "./Components/ToDoList";

function Routers(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/:charNm" element={<ToDoList />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;