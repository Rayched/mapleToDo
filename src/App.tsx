//Daily Planner 초안
/**
 * 아주 기본적인 형태의 To Do List
 * 금일 일정, 시작 시간, 종료시간을 입력하고
 * '일정 추가' 버튼을 클릭하면
 * 일정 입력 form 하단에 지금까지 추가했던 일정들이 나온다.
 */
import { useForm } from "react-hook-form";
import styled from "styled-components";

const ToDoForm = styled.form`
  margin: 5px 0px;
  span {
    display: block;
  };
`;

function App(){
  const {
    register,
    handleSubmit,
    formState
  } = useForm();

  const onValid = (data: any) => {
    console.log(data);
  };

  console.log(formState.errors);

  return (
    <div>
      <h2>Daily Planner</h2>
      <hr/>
      <ToDoForm onSubmit={handleSubmit(onValid)}>
        <span>
          일정 내용 &nbsp;
          <input 
            type="text" 
            placeholder="금 일 일정"
            {...register("ToDo", {
              required: "일정을 입력하지 않았습니다."
            })}
          />
        </span>
        <span>
          시작 시간 &nbsp;
          <input 
            type="text" 
            placeholder="시작 시간"
            {...register("startT", {
              required: "시작 시간을 입력하지 않았습니다.",
              minLength: 4,
              maxLength: 4
            })}
          />
        </span>
        <span>
          종료 시간 &nbsp;
          <input 
            type="text" 
            placeholder="종료 시간"
            {...register("endT", {
              required: "종료 시간을 입력하지 않았습니다.",
              minLength: 4,
              maxLength: 4
            })}
          />
        </span>
        <button>일정 등록</button>
      </ToDoForm>
    </div>
  );
}

/*
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
*/
export default App;