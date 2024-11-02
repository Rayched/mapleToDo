//To Do List
//일정 정보를 입력하는 입력 form

import { useState } from "react";
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
    Doing?: string;
};

const InputForm = styled.form`
    span {
        display: block;
    }
`;

const ToDoList = styled.div``;

function ToDoForm(){
    const [ToDo, setToDo] = useState<I_ToDo[]>([]);

    const {
        register,
        handleSubmit,
        setValue,
        formState
    } = useForm();

    const onValid = (data: I_InputData) => {
        const ToDoInfo: I_ToDo = {
            openT: data.opT_Hour + ":" + data.opT_Minute,
            endT: data.edT_Hour + ":" + data.edT_Minute,
            Doing: data.ToDoInput
        };

        setToDo((oldToDo) => [...oldToDo, ToDoInfo]);

        //Input 값 초기화

        setValue("opT_Hour", "");
        setValue("opT_Minute", "");
        setValue("edT_Hour", "");
        setValue("edT_Minute", "");
        setValue("ToDoInput", "");
    };

    console.log(formState.errors);

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
                <ul>
                    {
                        ToDo.length === 0 ? null
                        : (
                                ToDo.map((todo) => {
                                    return (
                                        <li>
                                            <input type="checkbox"/>
                                            {todo.Doing} ({todo.openT} ~ {todo.endT})
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