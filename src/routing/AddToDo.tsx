import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { I_WeeklyQuest, ToDosAtom } from "../Atoms";

interface I_Wrapper {
    isHides: boolean;
}

const Wrapper = styled.div<I_Wrapper>`
    width: 100vw;
    height: 100vh;
    top: 0%;
    position: absolute;
    background-color: rgba(10, 10, 10, 0.5);
    display: ${(props) => props.isHides ? "flex" : "none"};
    justify-content: center;
    align-items: center;
`;

const ToDoBox = styled.div`
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

const ToDoForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

interface I_AddToDo {
    isToDo: boolean;
    setIsToDo: Function;
};

const AllToDos = {
    WeeklyQuest: [
        {
            questId: "Arc01",
            questNm: "에르다 스펙트럼"
        },
        {
            questId: "Arc02",
            questNm: "배고픈 무토"
        },
        {
            questId: "Arc03",
            questNm: "레헬른 숨바꼭질"
        },
        {
            questId: "Arc04",
            questNm: "스피릿 세이비어"
        },
        {
            questId: "Arc05",
            questNm: "엔하임 디펜스"
        },
        {
            questId: "Arc06",
            questNm: "프로텍트 에스페라"
        },
    ],
    WeeklyContents: [],
    WeeklyBoss: []
};

function AddToDo({isToDo, setIsToDo}: I_AddToDo){
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
            <ToDoBox>
                <ToDoHeader>
                    <button onClick={() => setIsToDo(false)}>취소</button>
                </ToDoHeader>
                <ToDoForm onSubmit={handleSubmit(onValid)}>
                    <div className="Category">카테고리 : 주간 퀘스트</div>
                    <div className="ToDoSelect">
                        <select {...register("Quest", {required: true})}>
                            {
                                AllToDos.WeeklyQuest.map((todo) => <option key={todo.questId}>{todo.questNm}</option>)
                            }
                        </select>
                    </div>
                    <button>등록</button>
                </ToDoForm>
            </ToDoBox>
        </Wrapper>
    );
};

export default AddToDo;