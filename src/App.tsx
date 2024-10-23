//Daily Planner 초안
/**
 * 아주 기본적인 형태의 To Do List
 * 금일 일정, 시작 시간, 종료시간을 입력하고
 * '일정 추가' 버튼을 클릭하면
 * 일정 입력 form 하단에 지금까지 추가했던 일정들이 나온다.
 */

import React, { useState } from "react";
import styled from "styled-components";

const ToDoInputForm = styled.form`
  input {
    display: block;
  }
`;

interface I_ToDos {
  ToDo?: string;
  openT?: string;
  endT?: string;
}

function App(){
  const [ToDos, setToDos] = useState<I_ToDos[]>([]);
  const [openT, setOpenT] = useState("");
  const [endT, setCloseT] = useState("");
  const [Quest, setQuest] = useState("");

  const saveTimes = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(openT !== "" && endT !== "" && Quest !== ""){
      const ToDoItems: I_ToDos = {
        ToDo: Quest,
        openT: openT,
        endT: endT
      }
          
      setToDos((oldToDos) => [...oldToDos, ToDoItems]);
      setOpenT("");
      setCloseT("");
      setQuest("");
    } else {
      return;
    };
  };

  const openT_Change = (event: React.ChangeEvent<HTMLInputElement>) => setOpenT(event.currentTarget.value);
  const endT_Change = (event: React.ChangeEvent<HTMLInputElement>) => setCloseT(event.currentTarget.value);
  const Quest_Change = (event: React.ChangeEvent<HTMLInputElement>) => setQuest(event.currentTarget.value);

  return (
    <div>
      <h4>일정 입력</h4>
      <ToDoInputForm onSubmit={saveTimes}>
        <input 
          name="openT" 
          type="text" 
          value={openT} 
          onChange={openT_Change}
          placeholder="시작 시간"
        />
        <input 
          name="endT" 
          type="text" 
          value={endT}
          onChange={endT_Change}
          placeholder="종료 시간"
        />
        <input 
          name="Quest"
          type="text"
          value={Quest}
          onChange={Quest_Change}
          placeholder="일정을 입력해주세요."
        />
        <button type="submit">일정 추가</button>
      </ToDoInputForm>
      <div>
        <ul>
        {
          ToDos.map((todo) => {
            return (
              <li>
                {todo.ToDo} ({todo.openT} ~ {todo.endT})
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