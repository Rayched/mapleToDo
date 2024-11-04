//To Do List
//일정 정보를 입력하는 입력 form

import React, { useState } from "react";
import styled from "styled-components";
import CreateToDo from "./components/createToDo";

const ToDoList = styled.div`
    .NavBar {
        display: flex;
        
        .Category {
            padding: 0px 3px;
            margin: 0px 3px;
        }
    };
`;

function ToDoForm(){
    const [isInput, setInput] = useState("Open");

    const onClick = () => {
        if(isInput === "Open"){
            setInput("Close");
        } else {
            setInput("Open");
        };
    }

    return (
        <div>
            <button onClick={onClick}>{isInput}</button>
            {
                isInput === "Close" ? <CreateToDo /> : null
            }
            <ToDoList>
                <h4>일정 목록</h4>
                <div className="NavBar">
                    <span className="Category">진행 중</span>
                    <span className="Category">완료</span>
                </div>
            </ToDoList>
        </div>
    );
};

export default ToDoForm;