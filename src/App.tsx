import { useState } from "react";
import styled from "styled-components";

interface I_ToDoItem {
  Checked: boolean;
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 5px 0px;
  margin: 5px 0px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

const SideBar = styled.aside`
  padding: 5px 0px;
  margin: 5px 0px;
  position: absolute;
  right: 5%;
`;

const ToDo_Categorys = styled.nav`
  padding: 5px;
  margin: 8px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .Category {
    padding: 5px;
    margin: 0px 5px;
    display: flex;
    border: 2px solid black;
    border-radius: 15px;
  }
`;

const MainContainer = styled.main`
  padding: 5px 0px;
  margin: 5px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ToDoNav = styled.div`
  padding: 5px 0px;
  margin: 5px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h4 {
    margin: 3px 0px;
  }
`;

const ToDoItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px 0px;
  margin: 8px 0px;
`;

const ToDoItem = styled.li<I_ToDoItem>`
  text-decoration: ${(props) => props.Checked ? "line-through" : "none"};
`;

function App(){
  const [checked, setChecked] = useState(false);

  const isChecked = () => {
    setChecked((prev) => !prev);
  } 

  return (
    <Wrapper>
      <Header>
        <h3>Daily Planner</h3>
      </Header>
      <ToDo_Categorys>
        <div className="Category">일정 진행</div>
        <div className="Category">일정 완료</div>
      </ToDo_Categorys>
      <SideBar>[Menu]</SideBar>
      <MainContainer>
        <ToDoNav>
          <h4>2025-01-27 월요일</h4>
          <button>일정 추가</button>
        </ToDoNav>
        <ToDoItems>
          <ul>
            <ToDoItem Checked={checked}>
              <input type="checkbox" value="todo1" onChange={isChecked}/>
              일정 1
            </ToDoItem>
          </ul>
        </ToDoItems>
      </MainContainer>
    </Wrapper>
  );
}

export default App;