//Detail Page, Main Part Components

import styled from "styled-components";
import { BossAtoms, CategoriesAtom, I_Categories, ToDosSelect, WeeklyAtoms } from "../../Atoms";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import AddToDo from "./Forms/FormBox";

interface I_CategoryItem {
    Id: string;
    NowCategory: string;
}

const Categorys: I_Categories[] = [
    {Id: "Weeklys", name: "주간 컨텐츠"}, 
    {Id: "Boss", name: "주간 보스"}, 
    {Id: "Customs", name: "기타 메할일"}
];

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Categories = styled.div`
    display: flex;
    flex-direction: row;
    background-color: lightgray;
    padding: 10px;
    border-radius: 15px;
`;

const CategoryItem = styled.div<I_CategoryItem>`
    display: flex;
    text-align: center;
    border-radius: 15px;
    margin: 5px;
    padding: 5px;
    color: ${(props) => props.Id === props.NowCategory ? "white" : "black"};
    font-weight: bold;
    background-color: ${(props) => props.Id === props.NowCategory ? "rgb(50, 50, 50)" : "rgb(250, 250, 250)"};
`;

const ToDoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ToDoItem = styled.li`
    margin: 3px 0px;
    padding: 5px;
    display: flex;
    align-items: center;
    border: 2px solid black;
    border-radius: 10px;
    width: 10em;
    height: 1.2em;
`;

const ToDoText = styled.span`
    display: flex;
    justify-content: center;
    text-align: center;
    width: 80%;
`;

function ToDoList(){
    const [isHide, setHide] = useState(false);
    //AddToDo Render 여부 관리용 state

    const [NowCategories, setCategories] = useRecoilState(CategoriesAtom);
    const Weeklys = useRecoilValue(WeeklyAtoms);
    const BossContents = useRecoilValue(BossAtoms);

    const ToDoDatas = useRecoilValue(ToDosSelect);

    const ChangeCategory = (targetId: string) => {
        const Idx = Categorys.findIndex((item) => item.Id === targetId);

        const newCategories: I_Categories = {
            Id: targetId,
            name: Categorys[Idx].name
        };

        setCategories(newCategories);
    };

    useEffect(() => console.log(BossContents), [BossContents]);

    return (
        <Container>
            <Categories>
                {
                    Categorys.map((items) => {
                        return (
                            <CategoryItem 
                                key={items.Id}
                                Id={items.Id}
                                NowCategory={NowCategories.Id}
                                onClick={() => ChangeCategory(items.Id)}
                            >{items.name}</CategoryItem>
                        );
                    })
                }
            </Categories>
            <ToDoWrapper>
                <div className="AddToDoContainer">
                    <button onClick={() => setHide((prev) => !prev)}>할 일 추가</button>
                    {isHide ? <AddToDo setHide={setHide} />: null}
                </div>
                <ul className="ToDoItemContainer">
                    {
                        ToDoDatas?.map((data) => {
                            return (
                                <ToDoItem key={data.Id}>
                                    <input type="checkbox"/>
                                    <ToDoText>{data.Name}</ToDoText>
                                </ToDoItem>
                            )})
                    }
                </ul>
            </ToDoWrapper>
        </Container>
    );
};

export default ToDoList;