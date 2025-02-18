import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { I_WeeklyQuest, ToDosAtom } from "../../Atoms";
import { I_Categories } from "./ToDoList";
import { ContentsData } from "../../modules/datas/ContentsData";

interface I_Wrapper {
    isHides: boolean;
}

const Wrapper = styled.div<I_Wrapper>`
    width: 100vw;
    height: 100vh;
    top: 0%;
    right: 0%;
    position: absolute;
    background-color: rgba(10, 10, 10, 0.5);
    display: ${(props) => props.isHides ? "flex" : "none"};
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    width: 29em;
    height: 35em;
    background-color: rgba(245, 245, 245, 1.0);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
`;

const ToDoHeader = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    padding: 8px;
`;

const ToDoBody = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

interface I_AddToDo {
    isToDo: boolean;
    setIsToDo: Function;
    nowCategories: string;
};

const CategoryList: I_Categories[] = [
    {categoryId: "WeeklyContents", categoryNm: "주간 컨텐츠"},
    {categoryId: "WeeklyBoss", categoryNm: "주간 보스"},
    {categoryId: "CustomToDo", categoryNm: "기타 메할일"},
];

function AddToDo({isToDo, setIsToDo, nowCategories}: I_AddToDo){
    const {register, handleSubmit} = useForm();

    const setToDos = useSetRecoilState(ToDosAtom);

    const onValid = (FormData: any) => {
        const Test: I_WeeklyQuest = {
            questId: FormData.Quest,
            questNm: FormData.Quest
        };

        console.log(Test);
        setToDos((oldToDos) => {
            return [
                ...oldToDos,
                Test
            ];
        })
        setIsToDo(false);
    };

    return (
        <Wrapper isHides={isToDo}>
            <Container>
                <ToDoHeader>
                    <button onClick={() => setIsToDo(false)}>취소</button>
                </ToDoHeader>
                <ToDoBody onSubmit={handleSubmit(onValid)}>
                    <div>{nowCategories}</div>
                    <div className="ToDoSelect">
                        <select {...register("contentItems", {required: true})}>
                        </select>
                    </div>
                    <button>등록</button>
                </ToDoBody>
            </Container>
        </Wrapper>
    );
};

export default AddToDo;