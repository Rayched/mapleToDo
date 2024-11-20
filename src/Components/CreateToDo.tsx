import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { I_ToDoItem, ToDoDatas } from "../atoms";

function CreateToDo(){
    const {register, handleSubmit, setValue} = useForm<I_ToDoItem>();
    const [ToDos, setToDos] = useRecoilState(ToDoDatas);

    const AddToDos = (toDoData: I_ToDoItem) => {
        const ConvertData: I_ToDoItem = {
            todo: toDoData.todo,
            openT: toDoData.openT,
            endT: toDoData.endT,
            categorys: "Doing"
        };

        setToDos((oldToDos) => [
            ...oldToDos,
            ConvertData
        ]);

        setValue("todo", "");
        setValue("openT", "");
        setValue("endT", "");
    };

    console.log(ToDos);

    return (
        <form onSubmit={handleSubmit(AddToDos)}>
            <h4>일정 등록</h4>
            <div>
                <span>일정 내용</span>
                <input 
                    type="text" 
                    placeholder="일정을 입력해주세요. (필수)"
                    {...register(
                        "todo", {required: "일정을 입력해주세요!!"}
                    )}
                />
            </div>
            <div>
                <span>시작 시간</span>
                <input 
                    type="text" 
                    placeholder="시작 시간을 입력해주세요. (선택)"
                    {...register("openT", {maxLength: 4})}
                />
            </div>
            <div>
                <span>종료 시간</span>
                <input 
                    type="text" 
                    placeholder="종료 시간을 입력해주세요. (선택)"
                    {...register("endT", {maxLength: 4})}
                />
            </div>
            <button>일정 추가</button>
        </form>
    );
};

export default CreateToDo;