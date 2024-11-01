import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const ToDoInputForm = styled.form`
    button {
        display: block;
        margin-top: 5px;
    };
`;

interface I_ToDo {
    ToDo?: string;
}

function ToDoSample(){
    const { register, watch } = useForm();

    console.log(watch());

    return (
        <div>
            <h2>To Do List</h2>
            <ToDoInputForm>
                <h4>일정 입력</h4>
                일정: 
                <input 
                    type="text" 
                    placeholder="일정을 입력해주세요."
                    {...register("toDo")}
                />
                <button>일정 추가</button>
            </ToDoInputForm>
            <div>
                <h4>일정 목록</h4>
                <ul>
                </ul>
            </div>
        </div>
    );
    /*
    기존 코드
    const [ToDo, setToDo] = useState("");
    const [ToDos, setToDos] = useState<I_ToDo[]>([]);

    const {} = useForm();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {currentTarget: {value}} = event;
        setToDo(value);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(ToDo !== ""){
            const ToDosData: I_ToDo = {
                ToDo: ToDo
            };
            setToDos((oldToDos) => [...oldToDos, ToDosData]);
            setToDo("");
        } else {
            alert("일정을 입력하지 않았습니다.");
            return;
        }
    };

    return (
        <div>
            
        </div>
    );*/
};

export default ToDoSample;