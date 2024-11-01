//Daily Planner 초안
/**
 * 아주 기본적인 형태의 To Do List
 * 금일 일정, 시작 시간, 종료시간을 입력하고
 * '일정 추가' 버튼을 클릭하면
 * 일정 입력 form 하단에 지금까지 추가했던 일정들이 나온다.
 */
import styled from "styled-components";
import ToDoForm from "./ToDoForm";

const Header = styled.header`
  display: flex;
  justify-content: center;

  h3 {
    padding: 3px 0px;
    font-size: 20px;
  }
`;

function App(){
  /*
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
  );*/
  return (
    <>
      <Header>
        <h3>Daily Planner / 일일 계획표</h3>
      </Header>
      <ToDoForm />
    </>
  );
}

export default App;