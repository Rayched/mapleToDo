//Detail Page, Main Part Components

import styled from "styled-components";
import { CategoriesAtom, I_Categories, WeeklyAtoms } from "../../Atoms";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import AddToDo from "./AddToDo";

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

function Mains(){
    const [isHide, setHide] = useState(false);
    //AddToDo Render 여부 관리용 state

    const [NowCategories, setCategories] = useRecoilState(CategoriesAtom);
    const Weeklys = useRecoilValue(WeeklyAtoms);

    const ChangeCategory = (targetId: string) => {
        const Idx = Categorys.findIndex((item) => item.Id === targetId);

        const newCategories: I_Categories = {
            Id: targetId,
            name: Categorys[Idx].name
        };

        setCategories(newCategories);
    };

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
                <button onClick={() => setHide((prev) => !prev)}>할 일 추가</button>
                {isHide ? <AddToDo setHide={setHide} />: null}
                <ul>
                    {
                        Weeklys.map((item) => {
                            return (
                                <li>
                                    <input type="checkbox" />
                                    {item.contentsNm}
                                </li>
                            );
                        })
                    }
                </ul>
            </ToDoWrapper>
        </Container>
    );
};

export default Mains;