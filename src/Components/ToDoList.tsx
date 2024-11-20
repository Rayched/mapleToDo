import { useRecoilValue } from "recoil";
import { ToDoDatas } from "../atoms";

function ToDoList(){
    const todoDatas = useRecoilValue(ToDoDatas);

    return (
        <div>
            <h4>일정 목록</h4>
            <div>
                {
                    todoDatas.map((todo) => {
                        return (
                            <div>
                                <div>{todo.todo}</div>
                                {
                                    (todo.openT === "" && todo.endT === "")
                                    ? null : <div>{todo.openT} ~ {todo.endT}</div>
                                }
                                <div>{todo.categorys}</div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default ToDoList;