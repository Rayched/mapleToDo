//Detail Page, Main Part Components

import styled from "styled-components";
import {A_MapleToDos, CategoriesAtom, I_Categories, I_MapleToDos, OcidAtoms, ToDos} from "../../Atoms";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import AddToDo from "./Forms/FormBox";
import { I_DelBtn } from "./Forms/WeeklyForms";
import BossItem from "./ToDoItems/BossItem";
import WeeklyItem from "./ToDoItems/WeeklyItem";
import CustomToDoItem from "./ToDoItems/ToDoItem";

interface I_CategoryItem {
    category_id: string;
    nowCategories: string;
};

interface I_DeleteTarget {
    targetId: string;
    charNm?: string;
};

export interface I_ToDoItemProps {
    Delete: boolean;
    setDelete: Function;
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
    color: ${(props) => props.category_id === props.nowCategories ? "white" : "black"};
    font-weight: bold;
    background-color: ${(props) => props.category_id === props.nowCategories ? "rgb(50, 50, 50)" : "rgb(250, 250, 250)"};
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
    width: 15em;
    height: 1.2em;
`;

const ToDoText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
`;

const DelBtn = styled.button<I_DelBtn>`
    display: ${(props) => props.isHide ? "flex" : "none"};
    margin: 0px 3px;
    width: 4em;
    height: 1.5rem;
    justify-content: center;
    text-align: center;
`;

function ToDoList(){
    const [isHide, setHide] = useState(false);
    //AddToDo Render 여부 관리용 state

    const [DelBtnHide, setDelBtnHide] = useState(false);

    const [NowCategories, setCategories] = useRecoilState(CategoriesAtom);
    const ToDoDatas = useRecoilValue(ToDos);

    const CharId = useRecoilValue(OcidAtoms).charNm;
    const [MapleToDos, setMapleToDos] = useRecoilState(A_MapleToDos);

    const ChangeCategory = (targetId: string) => {
        const Idx = Categorys.findIndex((item) => item.Id === targetId);

        const newCategories: I_Categories = {
            Id: targetId,
            name: Categorys[Idx].name
        };

        setCategories(newCategories);
    };


    const ToDoDelete = (Targets: I_DeleteTarget) => {
        const {targetId, charNm} = Targets;

        const IsDelete = window.confirm(`' ${charNm} / ${targetId}' 일정을 삭제하겠습니까?`);
        const Idx = MapleToDos.findIndex((data) => data.charNm === charNm);

        if(IsDelete && Idx !== -1){
            const CharData = MapleToDos[Idx];

            if(NowCategories.Id === Categorys[0].Id){
                const UpdateWeekly = CharData.WeeklyToDos?.filter((data) => data.ContentsId !== targetId);
                const ModifyData: I_MapleToDos = {
                    charNm: CharData.charNm,
                    ocids: CharData.ocids,
                    WeeklyToDos: UpdateWeekly,
                    BossToDos: CharData.BossToDos,
                    CustomToDos: CharData.CustomToDos
                };
                setMapleToDos((oldToDos) => [
                    ...oldToDos.slice(0, Idx),
                    ModifyData,
                    ...oldToDos.slice(Idx + 1)
                ]);
            } else if(NowCategories.Id === Categorys[1].Id){
                const UpdateBossContents = CharData.BossToDos?.filter((data) => data.ContentsId !== targetId);
                const ModifyData: I_MapleToDos = {
                    charNm: CharData.charNm,
                    ocids: CharData.ocids,
                    WeeklyToDos: CharData.WeeklyToDos,
                    BossToDos: UpdateBossContents,
                    CustomToDos: CharData.CustomToDos
                }
                setMapleToDos((oldToDos) => [
                    ...oldToDos.slice(0, Idx),
                    ModifyData,
                    ...oldToDos.slice(Idx + 1)
                ]);
            } else {
                const UpdateCustomToDos = CharData.CustomToDos?.filter((data) => data.ContentsId !== targetId);
                const ModifyData: I_MapleToDos = {
                    charNm: CharData.charNm,
                    ocids: CharData.ocids,
                    WeeklyToDos: CharData.WeeklyToDos,
                    BossToDos: CharData.BossToDos,
                    CustomToDos: UpdateCustomToDos
                }
                setMapleToDos((oldToDos) => [
                    ...oldToDos.slice(0, Idx),
                    ModifyData,
                    ...oldToDos.slice(Idx + 1)
                ]);
            }
        } else {
            return;
        }
    };

    return (
        <Container>
            <Categories>
                {
                    Categorys.map((items) => {
                        return (
                            <CategoryItem 
                                key={items.Id}
                                category_id={items.Id}
                                nowCategories={NowCategories.Id}
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
                    <button onClick={() => setDelBtnHide((prev) => !prev)}>일정 삭제</button>
                </div>
                <ul className="ToDoItemContainer">
                    {NowCategories.Id === "Weeklys" ? <WeeklyItem Delete={DelBtnHide} setDelete={setDelBtnHide}/> : null}
                    {NowCategories.Id === "Boss" ? <BossItem Delete={DelBtnHide} setDelete={setDelBtnHide}/> : null}
                    {NowCategories.Id === "Customs" ? <CustomToDoItem Delete={DelBtnHide} setDelete={setDelBtnHide}/> : null}
                </ul>
            </ToDoWrapper>
        </Container>
    );
};

export default ToDoList;