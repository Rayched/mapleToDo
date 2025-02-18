import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { NowCategoriesAtom, ToDosAtom } from "../../Atoms";

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
};

function AddToDo({isToDo, setIsToDo}: I_AddToDo){
    const {register, handleSubmit} = useForm();
    const NowCategories = useRecoilValue(NowCategoriesAtom);

    //const setToDos = useSetRecoilState(ToDosAtom);

    const onValid = (FormData: any) => {
        /*
        setToDos((oldToDos) => {
            return [
                ...oldToDos,
                Test
            ];
        })
        setIsToDo(false);
        */
    };

    return (
        <Wrapper isHides={isToDo}>
            <Container>
                <ToDoHeader>
                    <button onClick={() => setIsToDo(false)}>취소</button>
                </ToDoHeader>
                <ToDoBody onSubmit={handleSubmit(onValid)}>
                    <div>{NowCategories.name}</div>
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