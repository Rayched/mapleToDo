import styled from "styled-components";
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
    border: 2px solid black;
    padding: 5px;
    font-weight: bold;
    border-radius: 10px;
`;

const ToDoWrapper = styled.div``;

function DailyPlanner(){
    const Category = [
        {id: "AddToDo", name: "일정 등록"}, 
        {id: "Doing", name: "진행 중"}, 
        {id: "Done", name: "완료"}
    ];
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
                            <Category_Item name={category.id} onClick={ChangePage}>
                                {category.name}
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