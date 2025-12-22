/**
 * 카테고리 별 To Do Item에서 공통된 부분만
 * 모아둔 추상 컴포넌트 BasedToDo
 */

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {styled} from "styled-components";
import { I_DataFormat, IsEditMode, S_MapleToDos } from "../../../Atoms";
import { useEffect, useState } from "react";
import useToDoReset from "../../../modules/useResetUtils";

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

const CheckBox = styled.div<I_Checked>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1em;
    height: 1em;
    background-color: ${(props) => props.isDone ? "rgb(220, 221, 225)" : "rgb(250, 250, 250)"};
    border: 2px solid black;
    border-radius: 20px;
`;

const CheckIcon = styled.span<I_Checked>`
    display: ${(props) => props.isDone ? "flex" : "none"};
    font-weight: bold;
    font-size: 16px;
`;

const ContentsBody = styled.div<I_Checked>`
    width: 85%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => props.isDone ? "lightgray" : "black"};
    text-decoration: ${(props) => props.isDone ? "line-through" : "none"};
`;

const DeleteBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 121, 121);
    border: 2px solid rgb(250, 250, 250);
    border-radius: 20px;
    padding: 1px;

    &:hover {
        background-color: rgb(252, 98, 98);
    };
`;

function BasedToDo({ToDoId, isDones, children}: I_BasedToDo){
    const [ToDos, setToDos] = useRecoilState(S_MapleToDos);
    const IsEdits = useRecoilValue(IsEditMode);
    const {ToDoDone} = useToDoReset();

    //일정 완료 여부를 설정하는 onChange Event Handler
    const onChange = (targetId?: string) => {
        ToDoDone(String(targetId));
    };

    const onDelete = (targetId?: string) => {
        const Targets = ToDos?.find((data) => data.ContentsId === targetId);
        const isDelete = window.confirm(`'${Targets?.ContentsNm}'을 삭제하겠습니까?`);

        if(isDelete){
            const Modify = ToDos?.filter((data) => {
                if(data.ContentsId !== targetId){
                    return data;
                } else {
                    return;
                }
            });
            alert(`'일정: ${Targets?.ContentsNm}' 삭제 완료`);
            setToDos(Modify);
        } else {
            alert(`'일정: ${Targets?.ContentsNm}' 삭제 취소`);
        }
    };

    return (
        <ToDoItem isDone={isDones}>
            <CheckBox isDone={isDones} onClick={() => onChange(ToDoId)}>
                <CheckIcon isDone={isDones}>✔</CheckIcon>
            </CheckBox>
            <ContentsBody isDone={isDones}>
                {children}
            </ContentsBody>
            {
                IsEdits ? (
                    <DeleteBtn onClick={() => onDelete(ToDoId)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="13" width="13" viewBox="0 0 384 512">
                            <path fill="#fafafa" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </svg>
                    </DeleteBtn>
                ) : null
            }
        </ToDoItem>
    );
};

export default BasedToDo;