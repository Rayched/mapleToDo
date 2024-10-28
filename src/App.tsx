//Daily Planner 초안
/**
 * 아주 기본적인 형태의 To Do List
 * 금일 일정, 시작 시간, 종료시간을 입력하고
 * '일정 추가' 버튼을 클릭하면
 * 일정 입력 form 하단에 지금까지 추가했던 일정들이 나온다.
 */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const ToDoInputForm = styled.form<{isOpen: boolean}>`
  input {
    display: block;
  }
  display: ${(props) => props.isOpen ? "block" : "none"};
  margin: 5px 0px;
`;

interface I_ToDos {
  ToDo?: string;
  startT?: string;
  endT?: string;
}

function App(){
  const [ToDos, setToDos] = useState<I_ToDos[]>([]);
  const [startTime, setStart] = useState("");
  const [endTime, setEnd] = useState("");
  const [ToDo, setToDo] = useState("");

  const [isHide, setHide] = useState(false);

  const {} = useForm();

  const saveTimes = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(startTime !== "" && endTime !== "" && ToDo !== ""){
      const ToDoItems: I_ToDos = {
        ToDo: ToDo,
        startT: startTime,
        endT: endTime
      }
          
      setToDos((oldToDos) => [...oldToDos, ToDoItems]);
      setStart("");
      setEnd("");
      setToDo("");
    } else {
      alert("일정 정보를 입력하지 않았습니다!");
      return;
    };
  };

  const startT_Change = (event: React.ChangeEvent<HTMLInputElement>) => setStart(event.currentTarget.value);
  const endT_Change = (event: React.ChangeEvent<HTMLInputElement>) => setEnd(event.currentTarget.value);
  const ToDo_Change = (event: React.ChangeEvent<HTMLInputElement>) => setToDo(event.currentTarget.value);

  const onClick = () => {
    setHide(!isHide);
  }

  return (
    <div>
      <h4>일정 입력</h4>
      <button onClick={onClick}>{isHide ? "Close" : "Open"}</button>
      <ToDoInputForm onSubmit={saveTimes} isOpen={isHide}>
        <input 
          name="Start_Time" 
          type="text" 
          value={startTime} 
          onChange={startT_Change}
          placeholder="시작 시간"
        />
        <input 
          name="endT" 
          type="text" 
          value={endTime}
          onChange={endT_Change}
          placeholder="종료 시간"
        />
        <input 
          name="Quest"
          type="text"
          value={ToDo}
          onChange={ToDo_Change}
          placeholder="일정을 입력해주세요."
        />
        <button type="submit">일정 추가</button>
      </ToDoInputForm>
      <div>
        <h4>일정 목록</h4>
        <ul>
        {
          ToDos.map((todo) => {
            return (
              <li>
                {todo.ToDo} ({todo.startT} ~ {todo.endT})
              </li>
            );
          })
        }
        </ul>
      </div>
    </div>
  );
};

export default App;