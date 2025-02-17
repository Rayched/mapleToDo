import styled from "styled-components";
import AddToDo from "./AddToDo";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { ToDosAtom } from "../Atoms";

interface I_Categories {
    CategoryId: string;
    nowCategory: string;
};

const ToDos_Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CategoryBox = styled.div`
    display: flex;
    align-items: center;
    border: 2px solid black;
`;

const CategoryItem = styled.div<I_Categories>`
    display: flex;
    text-align: center;
    margin: 5px;
    padding: 5px;
    border: 1.5px solid black;
    border-radius: 15px;
    color: ${(props) => props.CategoryId === props.nowCategory ? "white" : "black"};
    font-weight: ${(props) => props.CategoryId === props.nowCategory ? "bold" : "none"};
    background-color: ${
        (props) => props.CategoryId === props.nowCategory ? "gray" : "white"
    };
`;

function ToDoList(){
    const [isAddToDo, setAddToDo] = useState(false);
    const ToDos = useRecoilValue(ToDosAtom);

    const [NowCategory, setCategory] = useState("");

    const CategoryChange = (categoryId: string) => {
        setCategory(categoryId);
    };

    return (
        <ToDos_Wrapper>
            <CategoryBox>
                <CategoryItem CategoryId="WeeklyContents" nowCategory={NowCategory} onClick={() => CategoryChange("WeeklyContents")}>
                    주간 컨텐츠
                </CategoryItem>
                <CategoryItem CategoryId="WeeklyBoss" nowCategory={NowCategory} onClick={() => CategoryChange("WeeklyBoss")}>
                    보스 컨텐츠
                </CategoryItem>
                <CategoryItem CategoryId="CustomToDo" nowCategory={NowCategory} onClick={() => CategoryChange("CustomToDo")}>
                    기타 메할일
                </CategoryItem>
            </CategoryBox>
            <div className="ToDoList">
                <button onClick={() => setAddToDo(true)}>할 일 추가</button>
            </div>
            <AddToDo isToDo={isAddToDo} setIsToDo={setAddToDo} nowCategories={NowCategory}/>
            <ul>
                {
                    ToDos?.map((todo) => <li>{todo.questNm}</li>)
                }
            </ul>
        </ToDos_Wrapper>
    );
};

export default ToDoList;