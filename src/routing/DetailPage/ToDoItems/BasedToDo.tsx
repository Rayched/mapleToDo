/**
 * 카테고리 별 To Do Item에서 공통된 부분만
 * 모아둔 추상 컴포넌트 BasedToDo
 */

import { useRecoilState, useSetRecoilState } from "recoil";
import {styled} from "styled-components";
import { I_DataFormat, S_MapleToDos } from "../../../Atoms";
import { useEffect, useState } from "react";

interface I_BasedToDo {
    ToDoId?: string;
    isDones?: boolean;
    children: React.ReactNode;
};

interface I_Checked {
    isDone?: boolean;
}

const ToDoItem = styled.li<I_Checked>`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 18em;
    border: 1.5px solid rgb(220, 221, 225);
    border-radius: 12px;
    padding: 3px;
    margin: 2px 0px;
    background-color: ${(props) => props.isDone ? "rgb(99, 110, 114)" : "rgb(220, 221, 225)"};
`;

const CheckBox = styled.input``;

const ContentsBody = styled.div<I_Checked>`
    width: 85%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    color: ${(props) => props.isDone ? "lightgray" : "black"};
    text-decoration: ${(props) => props.isDone ? "line-through" : "none"};
`;

const DeleteBtn = styled.div``;

function BasedToDo({ToDoId, isDones, children}: I_BasedToDo){
    const [ToDos, setToDos] = useRecoilState(S_MapleToDos);

    //일정 완료 여부를 설정하는 onChange Event Handler
    const onChange = (targetId?: string) => {
        const Target = ToDos?.find((todoData) => todoData.ContentsId === targetId);

        if(Target !== undefined){
            const Modifys = ToDos?.map((todoData) => {
                if(todoData.ContentsId === targetId){
                    const ModifyData: I_DataFormat = {
                        ContentsId: todoData.ContentsId,
                        ContentsNm: todoData.ContentsNm,
                        IsDone: todoData.IsDone ? false : true,
                        Rank: todoData.Rank,
                        Ranks: todoData.Ranks,
                        openDt: todoData.openDt,
                        endDt: todoData.endDt
                    };
                    return ModifyData;
                } else {
                    return todoData;
                }
            });
            setToDos(Modifys);
        } else {
            return;
        }
    };

    return (
        <ToDoItem isDone={isDones}>
            <CheckBox
                type="checkbox" 
                checked={isDones}
                onChange={() => onChange(ToDoId)}
            />
            <ContentsBody isDone={isDones}>
                {children}
            </ContentsBody>
            {
                false ? <DeleteBtn>삭제</DeleteBtn> : null
            }
        </ToDoItem>
    );
};

export default BasedToDo;