import { useForm } from "react-hook-form";
import styled from "styled-components";
import { I_ToDoInput, ToDos } from "../atoms";
import { useSetRecoilState } from "recoil";

const ToDoInputForm = styled.form``;

const ToDoInput = styled.span`
    display: block;
    padding: 2px;
    span {
        margin-right: 3px;
    };
`;

function CreateToDo(){
    const setToDos = useSetRecoilState(ToDos);

    const ConvertTime = (Times: string|undefined) => {
        const Targets = Times?.split("");
        const Hours = Targets?.slice(0, 2).join("");
        const Minutes = Targets?.slice(2).join("");

        return Hours + ":" + Minutes;
    }

    const {
        register,
        handleSubmit,
        setValue
    } = useForm();

    const onValid = (data: I_ToDoInput) => {
        const OpenT = ConvertTime(data.openT);
        const EndT = ConvertTime(data.endT);

        const newToDos: I_ToDoInput = {
            ToDo: data.ToDo,
            Category: "Doing",
            openT: OpenT,
            endT: EndT
        };

        setToDos((oldToDos) => {
            return [
                ...oldToDos,
                newToDos
            ];
        });

        setValue("openT", "");
        setValue("endT", "");
        setValue("ToDo", "");
    };

    return (
        <>
        <h4>일정 입력</h4>
        <ToDoInputForm onSubmit={handleSubmit(onValid)}>
            <ToDoInput>
                <span>시작 시간</span>
                <input 
                    type="text" 
                    placeholder="00:00 (시 : 분)"
                    {...register("openT", {
                        required: "시작 시간을 입력하지 않았습니다.",
                        maxLength: 4,
                    })}
                />
            </ToDoInput>
            <ToDoInput>
                <span>종료 시간</span>
                <input 
                    type="text" 
                    placeholder="00:00 (시 : 분)"
                    {...register("endT", {
                        required: "종료 시간을 입력하지 않았습니다.",
                        maxLength: 4
                    })}
                />
            </ToDoInput>
            <ToDoInput>
                <span>일정 내용</span>
                <input 
                    type="text" 
                    placeholder="일정을 입력해주세요."
                    {...register("ToDo", {
                        required: "일정 내용을 입력해주세요!"
                    })}
                />
            </ToDoInput>
            <button>일정 등록</button>
        </ToDoInputForm>
        </>
    );
};

export default CreateToDo;