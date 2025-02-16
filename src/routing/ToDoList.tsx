import styled from "styled-components";
import AddToDo from "./AddToDo";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { ToDosAtom } from "../Atoms";

const ToDos_Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

function ToDoList(){
    const [isAddToDo, setAddToDo] = useState(false);
    const ToDos = useRecoilValue(ToDosAtom);

    return (
        <ToDos_Wrapper>
            <div className="Categorys">
                <span>주간 컨텐츠</span> | <span>보스 컨텐츠</span> | <span>기타 메할일</span>
            </div>
            <div className="ToDoList">
                <button onClick={() => setAddToDo(true)}>할 일 추가</button>
            </div>
            <AddToDo isToDo={isAddToDo} setIsToDo={setAddToDo} />
            <ul>
                {
                    ToDos?.map((todo) => <li>{todo.questNm}</li>)
                }
            </ul>
        </ToDos_Wrapper>
    );
};

export default ToDoList;