import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { CategoriesAtom, I_WeeklyAtoms, WeeklyAtoms } from "../../Atoms";
import { Boss_data, Contents_data } from "../../modules/datas/ContentsData";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0%;
    right: 0%;
    position: absolute;
    background-color: rgba(10, 10, 10, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    width: 30em;
    height: 38em;
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

interface I_AddToDoParams {
    setHide: Function;
};

interface I_Forms {
    ToDoSelect?: string[];
}

function AddToDo({setHide}: I_AddToDoParams){
    const {watch, register, handleSubmit} = useForm();
    const NowCategories = useRecoilValue(CategoriesAtom);

    const [WeeklyData, setWeeklyData] = useRecoilState(WeeklyAtoms);

    const onValid = ({ToDoSelect}: I_Forms) => {
        if(ToDoSelect?.length === 0){
            return;
        } else {
            console.log(ToDoSelect);
            const AddWeeklyData = ToDoSelect?.map((data) => {
                const Values: I_WeeklyAtoms = {contentsNm: data, isAdds: true, isDone: false}
                return Values;
            }) as I_WeeklyAtoms[]
            setWeeklyData((oldItems) => [...oldItems, ...AddWeeklyData])
            setHide(false);
        }
    };

    return (
        <Wrapper>
            <Container>
                <ToDoHeader>
                    <button onClick={() => setHide(false)}>취소</button>
                </ToDoHeader>
                <ToDoBody onSubmit={handleSubmit(onValid)}>
                    <div>{NowCategories.name}</div>
                    <div className="ToDoSelect">
                        <select multiple {...register("ToDoSelect", {required: true})}>
                            {
                                NowCategories.Id === "Weeklys"
                                ? (
                                    Contents_data.value.map((data) => {
                                        return (
                                            <option key={data.contentId}>
                                                {data.contentNm}
                                            </option>
                                        );
                                    })
                                ) : null
                            }
                            {
                                NowCategories.Id === "Boss"
                                ? (
                                    Boss_data.value.map((data) => {
                                        return (
                                            <option key={data.monsterNm}>
                                                <label>{data.monsterNm}</label>
                                            </option>
                                        );
                                    })
                                ) : null
                            }
                        </select>
                    </div>
                    <button>등록</button>
                </ToDoBody>
            </Container>
        </Wrapper>
    );
};

export default AddToDo;