import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getCharData } from "../modules/Fetchs";
import styled from "styled-components";

const ToDos_Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

function ToDoList(){
   return (
        <ToDos_Wrapper>
            <div className="Categorys">
                <span>일일 컨텐츠</span> | <span>주간 컨텐츠</span> | <span>보스 컨텐츠</span>
            </div>
            <div className="ToDoList">
                <button>할 일 추가</button>
                <div className="ToDos">
                    <form>
                        <input type="checkbox"/>
                        소멸의 여로 일일 퀘스트
                    </form>
                    <form>
                        <input type="checkbox"/>
                        츄츄 아일랜드 일일 퀘스트
                    </form>
                    <form>
                        <input type="checkbox"/>
                        레헬른 일일 퀘스트
                    </form>
                    <form>
                        <input type="checkbox"/>
                        아르카나 일일 퀘스트
                    </form>
                    <form>
                        <input type="checkbox"/>
                        모라스 일일 퀘스트
                    </form>
                    <form>
                        <input type="checkbox"/>
                        에스페라 일일 퀘스트
                    </form>
                </div>
            </div>
        </ToDos_Wrapper>
   )
};

export default ToDoList;