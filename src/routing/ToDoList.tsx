import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getCharData } from "../modules/Fetchs";
import styled from "styled-components";

interface I_Wrapper {
    isHide : boolean;
}

const ToDos_Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AddWrapper = styled.div<I_Wrapper>`
    width: 100vw;
    height: 100vh;
    top: 0%;
    position: absolute;
    background-color: rgba(10, 10, 10, 0.5);
    display: ${(props) => props.isHide ? "flex" : "none"};
    justify-content: center;
    align-items: center;
`;

const AddToDo = styled.div`
    width: 29em;
    height: 35em;
    background-color: rgba(245, 245, 245, 1.0);
    border-radius: 15px;
`;

function ToDoList(){
    const [Hide, setHide] = useState(false);

   return (
        <ToDos_Wrapper>
            <div className="Categorys">
                <span>주간 컨텐츠</span> | <span>보스 컨텐츠</span> | <span>기타 메할일</span>
            </div>
            <div className="ToDoList">
                <button onClick={() => setHide(true)}>할 일 추가</button>
            </div>
            <AddWrapper isHide={Hide}>
                <AddToDo onClick={() => setHide(false)}/>
            </AddWrapper>
        </ToDos_Wrapper>
   );
};

export default ToDoList;