import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { categorys } from "../atoms";
import { useState } from "react";
import CreateToDo from "./CreateToDo";
import ToDoList from "./ToDoList";

const Headers = styled.header`
    display: flex;
    justify-content: center;
    padding: 3px 0px;
`;
const ToDo_Title = styled.h3``;

const Categorys = styled.nav`
    display: flex;
    justify-content: space-between;
`;
const Category_Item = styled.button`
    border: 1px solid black;
    padding: 2px;
`;

const ToDoWrapper = styled.div``;

function DailyPlanner(){
    const Category = useRecoilValue(categorys);
    const [isAddToDo, setAddToDo] = useState(false);

    const ChangePage = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget: {name}} = event;
        
        if(name === "AddToDo"){
            setAddToDo(true);
        } else if(name === "Doing" || name === "Done" || isAddToDo){
            setAddToDo(false);
        }
    }

    return (
        <div>
            <Headers>
                <ToDo_Title>Daily Planner / 일일 계획표</ToDo_Title>
            </Headers>
            <Categorys>
                {
                    Category.map((category) => {
                        return (
                            <Category_Item name={category} onClick={ChangePage}>
                                {category}
                            </Category_Item>
                        );
                    })
                }
            </Categorys>
            <ToDoWrapper>
                {
                    isAddToDo ? <CreateToDo />
                    : <ToDoList />
                }
            </ToDoWrapper>
        </div>
    );
};

export default DailyPlanner;