//Weekly Contents To Do form components

import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { I_WeeklyContentAtoms, WeeklyContentAtoms } from "../../../modules/datas/ContentAtoms";
import { I_WeeklyAtoms, WeeklyAtoms } from "../../../Atoms";
import { I_AddToDoParams } from "../AddToDo";
import { useState } from "react";

interface I_WeeklyForms {
    WeeklyContents?: string;
};

interface I_ContentsItem {
    isAdds: boolean;
};

interface I_WeeklyItemBox {
    ItemsLength: number;
};

const WeeklyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const AddWeeklyForms = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SelectBox = styled.select`
    width: 15em;
    margin: 3px;
    align-items: center;
    text-align: center;
`;

const ContentsItem = styled.option<I_ContentsItem>`
    background-color: ${(props) => props.isAdds ? "lightgray" : "white"};
    font-weight: ${(props) => props.isAdds ? "none" : "bold"};
`;

const WeeklyItemBox = styled.ul<I_WeeklyItemBox>`
    width: 15em;
    background-color: rgb(216, 213, 213);
    border-radius: 15px;
    margin-top: 10px;
    display: ${(props) => props.ItemsLength === 0 ? "none" : "flex"};
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const WeeklyItem = styled.li`
    background-color: rgb(251, 240, 240);
    padding: 3px;
    font-weight: bold;
    margin: 3px 0px;
    border-radius: 15px;
    width: 10em;
    text-align: center;
`;

function AddWeeklyForm({setHide}: I_AddToDoParams){
    const {register, handleSubmit} = useForm();

    const [Items, setItems] = useState<I_WeeklyAtoms[]>([]);

    const [WeeklyData, setWeeklyData] = useRecoilState(WeeklyContentAtoms);

    const setWeeklyAtoms = useSetRecoilState(WeeklyAtoms);

    const onValid = ({WeeklyContents}: I_WeeklyForms) => {
        const idx = WeeklyData.findIndex((data) => WeeklyContents === data.Name);
        const SelectedItem = WeeklyData[idx];

        const EditItem: I_WeeklyContentAtoms = {
            Id: SelectedItem.Id,
            Name: SelectedItem.Name,
            isAdds: true
        };

        const AddWeeklyData: I_WeeklyAtoms = {
            contentsNm: WeeklyContents,
            isDone: false
        };

        setWeeklyData((oldItems) => [
            ...oldItems.slice(0, idx),
            EditItem,
            ...oldItems.slice(idx + 1)
        ]);

        setItems((oldItems) => [...oldItems, AddWeeklyData]);
    };

    const WeeklySubmit = () => {
        if(Items.length === 0){
            alert("일정을 등록해주세요.");
            return;
        } else {
            setWeeklyAtoms((oldItems) => [...oldItems, ...Items]);
            setItems([]);
            setHide(false);
        }
    }

    return (
        <WeeklyWrapper>
            <AddWeeklyForms onSubmit={handleSubmit(onValid)}>
                <SelectBox {...register("WeeklyContents", {required: true})}>
                    {
                        WeeklyData.map((data) => {
                            return (
                                <ContentsItem key={data.Id} disabled={data.isAdds} isAdds={data.isAdds}>
                                    {data.Name}
                                </ContentsItem>
                            );
                        })
                    }
                </SelectBox>
                <button>할 일 추가</button>
            </AddWeeklyForms>
            <WeeklyItemBox ItemsLength={Items.length}>
                {
                    Items.map((todo) => {
                        return (
                            <WeeklyItem key={todo.contentsNm}>{todo.contentsNm}</WeeklyItem>
                        );
                    })
                }
                <button onClick={WeeklySubmit}>최종 등록</button>
            </WeeklyItemBox>
        </WeeklyWrapper>
    );
};

export default AddWeeklyForm;