import styled from "styled-components";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue} from "recoil";
import { I_Categories, NowCategoriesAtom, ToDosAtom } from "../../Atoms";
import AddToDo from "./AddToDo";

const Categories = [
    {
        categoryId : "WeeklyContents",
        categoryNm : "주간 컨텐츠"
    },
    {
        categoryId : "WeeklyBoss",
        categoryNm : "주간 보스"
    },
    {
        categoryId : "CustomToDo",
        categoryNm : "기타 메할일"
    }
];

interface I_CategoryItem {
    CategoryId: string;
    nowCategory: string;
};

const Wrapper = styled.div`
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

const CategoryItem = styled.div<I_CategoryItem>`
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

const ToDosContainer = styled.div``;

function ToDoList(){
    const [isAddToDo, setAddToDo] = useState(false);
    const ToDos = useRecoilValue(ToDosAtom);
    const [NowCategories, setNowCategories] = useRecoilState(NowCategoriesAtom);

    const CategoryChange = (Selected: I_Categories) => {
        const Convert_Categorys: I_Categories = {
            Id: Selected.Id,
            name: Selected.name
        };
        setNowCategories(Convert_Categorys);
    };

    return (
        <Wrapper>
            <CategoryBox>
                {
                    Categories.map((item) => {
                        return (
                            <CategoryItem 
                                CategoryId={item.categoryId}
                                nowCategory={NowCategories.Id} 
                                onClick={() => CategoryChange({Id: item.categoryId, name: item.categoryNm})}
                            >{item.categoryNm}</CategoryItem>
                        );
                    })
                }
            </CategoryBox>
            <ToDosContainer className="ToDoList">
                <button onClick={() => setAddToDo(true)}>할 일 추가</button>
                <AddToDo isToDo={isAddToDo} setIsToDo={setAddToDo} />
                <ul>{ToDos?.map((todo) => <li>{todo.questNm}</li>)}</ul>
            </ToDosContainer>
        </Wrapper>
    );
};

export default ToDoList;