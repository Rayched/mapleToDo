//To Do List
//일정 정보를 입력하는 입력 form

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface I_InputData {
    opT_Hour?: string;
    opT_Minute?: string;
    edT_Hour?: string;
    edT_Minute?: string;
    ToDoInput?: string;
};

interface I_ToDo {
    openT?: string;
    endT?: string;
    ToDo_text?: string;
    Category: "To-Do"|"Done";
};

const InputForm = styled.form`
    span {
        display: block;
    }
`;

const ToDoList = styled.div`

    .NavBar {
        display: flex;
        
        .Category {
            padding: 0px 3px;
            margin: 0px 3px;
        }
    };
`;

function ToDoForm(){
    const [ToDos, setToDos] = useState<I_ToDo[]>([]);

    const {
        register,
        handleSubmit,
        setValue,
    } = useForm();

    const onValid = (data: I_InputData) => {
        const ToDoInfo: I_ToDo = {
            openT: data.opT_Hour + ":" + data.opT_Minute,
            endT: data.edT_Hour + ":" + data.edT_Minute,
            ToDo_text: data.ToDoInput,
            Category: "To-Do"
        };

        setToDos((oldToDo) => [...oldToDo, ToDoInfo]);

        //Input 값 초기화

        setValue("opT_Hour", "");
        setValue("opT_Minute", "");
        setValue("edT_Hour", "");
        setValue("edT_Minute", "");
        setValue("ToDoInput", "");
    };

    const Change_Categorys = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: {name}
        } = event;

        console.log(event);

        setToDos((oldToDos) => {
            const TargetIndex = ToDos.findIndex((todo) => todo.ToDo_text === name);
            const FindToDo = oldToDos[TargetIndex];

            const newCategory = FindToDo.Category === "To-Do" ? "Done": "To-Do";
            
            const newToDo: I_ToDo = {
                openT: FindToDo.openT,
                endT: FindToDo.endT,
                ToDo_text: FindToDo.ToDo_text,
                Category: newCategory
            };

            return [
                ...oldToDos.slice(0, TargetIndex),
                newToDo,
                ...oldToDos.slice(TargetIndex + 1)
            ];
        });
    }

    return (
        <div>
            <InputForm onSubmit={handleSubmit(onValid)}>
                <span>
                    시작 시간 &nbsp;
                    <input 
                        type="number" 
                        placeholder="시 / Hour" 
                        {...register("opT_Hour", {
                                required: true,
                                min: 0,
                                max: 24,
                                maxLength: 2
                            }
                        )}
                    />
                    &nbsp; : &nbsp;
                    <input 
                        type="number" 
                        placeholder="분 / Minute"
                        {...register("opT_Minute", {
                            required: true,
                            min: 0,
                            max: 59,
                            maxLength: 2
                        })}
                    />
                </span>
                <span>
                    종료 시간 &nbsp;
                    <input 
                        type="text" 
                        placeholder="시 / Hour"
                        {...register("edT_Hour", {
                            required: true,
                            min: 0,
                            max: 24,
                            maxLength: 2
                        })}
                    />
                    &nbsp; : &nbsp;
                    <input 
                        type="text" 
                        placeholder="분 / Minute"
                        {...register("edT_Minute", {
                            required: true,
                            min: 0,
                            max: 59,
                            maxLength: 2
                        })}
                    />
                </span>
                <span>
                    일정 내용 &nbsp;
                    <input 
                        type="text" 
                        placeholder="일정을 입력해주세요."
                        {...register("ToDoInput", {
                            required: true
                        })}
                    />
                </span>
                <button>일정 등록</button>
            </InputForm>
            <ToDoList>
                <h4>일정 목록</h4>
                <div className="NavBar">
                    <span className="Category">진행 중</span>
                    <span className="Category">완료</span>
                </div>
                <ul>
                    {
                        ToDos.length === 0 ? null
                        : (
                                ToDos.map((todo) => {
                                    return (
                                        <li>
                                            {todo.ToDo_text} ({todo.openT} ~ {todo.endT})
                                            / {todo.Category}
                                            / <button name={todo.ToDo_text} onClick={Change_Categorys}>
                                                {todo.Category === "To-Do" ? "진행 중" : "완료"}
                                            </button> 
                                        </li>
                                    );
                                })
                        )
                    }
                </ul>
            </ToDoList>
        </div>
    );
};

export default ToDoForm;