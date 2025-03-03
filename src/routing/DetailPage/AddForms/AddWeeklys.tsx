//Weekly Contents To Do form components

import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { I_WeeklyContentAtoms, WeeklyContentAtoms } from "../../../modules/datas/ContentAtoms";
import { I_WeeklyAtoms, WeeklyAtoms } from "../../../Atoms";
import { I_AddToDoParams } from "../AddToDo";

interface I_WeeklyForms {
    WeeklyContents?: string;
};

interface I_ContentsItem {
    isAdds: boolean;
}

const AddWeeklyBody = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
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

function AddWeeklyForm({setHide}: I_AddToDoParams){
    const {register, handleSubmit} = useForm();

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
        setWeeklyAtoms((oldItems) => [...oldItems, AddWeeklyData]);
        setHide(false);
    };

    return (
        <AddWeeklyBody onSubmit={handleSubmit(onValid)}>
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
            <button>등록</button>
        </AddWeeklyBody>
    );
};

export default AddWeeklyForm;