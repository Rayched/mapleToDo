//Detail Page, Main Part Components

import styled from "styled-components";
import { A_MapleToDos, CategoriesAtom, I_Categories, IsEditMode, OcidAtoms, S_MapleToDos} from "../../Atoms";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import AddToDo from "./Forms/FormBox";
import { I_DelBtn } from "./Forms/WeeklyForms";
import BossItem from "./ToDoItems/BossItem";
import WeeklyItem from "./ToDoItems/WeeklyItem";
import CustomToDoItem from "./ToDoItems/ToDoItem";
import useToDoReset from "../../modules/useToDoReset";
import FormBox from "./Forms/FormBox";

interface I_CategoryItem {
    category_id: string;
    nowCategories: string;
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
    z-index: 2;
`;

const Categories = styled.div`
    display: flex;
    flex-direction: row;
    background-color: lightgray;
    padding: 10px;
    border-radius: 15px;
    position: relative;
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
    margin: 5px 0px;
    width: 100%;
`;

const AddToDoWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0%;
    right: 0%;
    position: absolute;
    background-color: rgba(10, 10, 10, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BtnBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 95%;
    max-width: 300px;
`;

const ToDoBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: bold;
    border: 2px solid rgb(68, 72, 77);
    border-radius: 10px;
    padding: 2px 3px;
    color: rgb(240, 240, 240);
    background-color: rgb(83, 92, 104);
    width: 100px;
    height: 20px;
    margin-left: 3px;

    svg {
        padding: 0px 1px;
    };
`;

const ToDoItems = styled.ul``;

function ToDoList(){
    const [isHide, setHide] = useState(false);
    //AddToDo Render 여부 관리용 state

    const [IsEdits, setEdits] = useRecoilState(IsEditMode);
    const {charNm} = useRecoilValue(OcidAtoms);
    const AllCharData = useRecoilValue(A_MapleToDos);
    const {ToDoReset} = useToDoReset();

    const [NowCategories, setCategories] = useRecoilState(CategoriesAtom);

    const ChangeCategory = (targetId: string) => {
        const Idx = Categorys.findIndex((item) => item.Id === targetId);

        const newCategories: I_Categories = {
            Id: Categorys[Idx].Id,
            name: Categorys[Idx].name
        };

        setCategories(newCategories);
    };

    const onClick_resetBtn = () => {
        const isReset = window.confirm(
            `'${charNm}' 외 캐릭터 ${AllCharData.length - 1}명\n컨텐츠 완료 기록을 초기화 하겠습니까?`
        );

        if(!isReset){
            alert("초기화 취소");
            return;
        } else {
            ToDoReset();
            alert("초기화 완료");
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
                <BtnBox>
                    {
                        IsEdits ? null : (
                            <>
                                <ToDoBtn onClick={() => setEdits(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 512 512">
                                        <path fill="rgb(245, 245, 245)" d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
                                    </svg>
                                    일정 편집
                                </ToDoBtn>
                                <ToDoBtn onClick={onClick_resetBtn}>초기화</ToDoBtn>
                            </>
                        )
                    }
                    {
                        !(IsEdits) ? null : (
                            <>
                                <ToDoBtn onClick={() => setHide(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 448 512">
                                        <path fill="#f5f5f5" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
                                    </svg>
                                    일정 추가
                                </ToDoBtn>
                                <ToDoBtn onClick={() => setEdits(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 640 512">
                                        <path fill="rgb(245, 245, 245)" d="M5.1 9.2C13.3-1.2 28.4-3.1 38.8 5.1l592 464c10.4 8.2 12.3 23.3 4.1 33.7s-23.3 12.3-33.7 4.1L9.2 42.9C-1.2 34.7-3.1 19.6 5.1 9.2z"/>
                                    </svg>
                                    편집 취소
                                </ToDoBtn>
                            </>
                        )
                    }
                </BtnBox>
                <ToDoItems>
                    {NowCategories.Id === "Weeklys" ? <WeeklyItem /> : null}
                    {NowCategories.Id === "Boss" ? <BossItem /> : null}
                    {NowCategories.Id === "Customs" ? <CustomToDoItem /> : null}
                </ToDoItems>
            </ToDoWrapper>
            {
                isHide ? (
                    <AddToDoWrapper>
                        <FormBox setHide={setHide} />
                    </AddToDoWrapper>
                ): null
            }
        </Container>
    );
};

export default ToDoList;