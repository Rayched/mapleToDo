//Weekly Contents To Do form components

import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue} from "recoil";
import styled from "styled-components";
import {OriginData} from "../../../modules/datas/originDatas";
import { I_AddToDoParams } from "./FormBox";
import React, { useEffect, useState } from "react";
import { A_MapleToDos, I_MapleToDos, I_WeeklyToDos, OcidAtoms } from "../../../Atoms";

interface I_WeeklyForms {
    WeeklyContents?: string;
};

export interface I_DelBtn {
    isHide: boolean;
};

export interface I_ContentsItem {
    isAdds: boolean;
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
    font-weight: bold;
`;

const WeeklyItemBox = styled.div`
    width: 15em;
    height: 20em;
    background-color: rgb(216, 213, 213);
    border-radius: 15px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const WeeklyItemHeader = styled.div`
    width: inherit;
    padding: 5px 0px;
    font-size: 15px;
    font-weight: bold;
    background-color: rgb(230, 225, 225);
    text-align: center;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
`;

const WeeklyItemList = styled.ul`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const WeeklyItem = styled.li`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(251, 240, 240);
    padding: 3px;
    font-weight: bold;
    margin: 3px 0px;
    border-radius: 5px;
    width: 12em;
    height: 1.5em;

    label {
        padding: 0px 1px;
        font-size: 15.5px;
    }
`;

const DelBtn = styled.button<I_DelBtn>`
    display: ${(props) => props.isHide ? "flex" : "none"};
    margin: 0px 3px;
`;

const BtnContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

function WeeklyForm({setHide}: I_AddToDoParams){
    const {register, handleSubmit} = useForm();

    const [Items, setItems] = useState<I_WeeklyToDos[]>([]);
    const [ShowDelBtn, setShowDelBtn] = useState(false);

    const CharId = useRecoilValue(OcidAtoms);
    const [ToDos, setToDos] = useRecoilState(A_MapleToDos);

    const WeeklyOriginData = OriginData.WeeklyContents;

    const onValid = ({WeeklyContents}: I_WeeklyForms) => {
        const idx = WeeklyOriginData.findIndex((data) => WeeklyContents === data.Name);
        const SelectedItem = WeeklyOriginData[idx];

        const AddWeeklyData: I_WeeklyToDos = {
            ContentsId: SelectedItem.Id,
            ContentsNm: SelectedItem.Name,
            IsDone: false
        };

        setItems((oldItems) => [
            ...oldItems,
            AddWeeklyData
        ]);
    };

    const WeeklySubmit = () => {
        const TargetIdx = ToDos.findIndex((data) => data.charNm === CharId.charNm);

        if(Items.length === 0){
            alert("일정을 등록해주세요.");
            return;
        } else if(Items.length !== 0 && TargetIdx === -1){
            const newCharData: I_MapleToDos = {
                charNm: String(CharId.charNm),
                ocids: CharId.ocid,
                WeeklyToDos: [...Items],
                BossToDos: [],
                CustomToDos: []
            };
            setToDos((oldToDos) => [...oldToDos, newCharData]);
            setItems([]);
            setHide(false);
        } else if(Items.length !== 0 && TargetIdx !== -1){
            const Targets = ToDos[TargetIdx];

            const EditWeeklys = Targets.WeeklyToDos?.concat(Items);
            
            const EditCharData: I_MapleToDos = {
                charNm: Targets.charNm,
                ocids: Targets.ocids,
                WeeklyToDos: EditWeeklys,
                BossToDos: Targets.BossToDos,
                CustomToDos: Targets.CustomToDos
            };

            setToDos((oldToDos) => [
                ...oldToDos.slice(0, TargetIdx),
                EditCharData,
                ...oldToDos.slice(TargetIdx + 1)
            ]);

            setItems([]);
            setHide(false);
        }
    }

    const ItemDelete = (ItemId?: string) => {
        const idx = Items.findIndex((elm) => ItemId === elm.ContentsId);
        const DeleteCheck = window.confirm(`{contentsNm: ${Items[idx].ContentsNm}}을 삭제하시겠습니까?`);

        if(DeleteCheck){
            setItems((oldItems) => [
                ...oldItems.slice(0, idx),
                ...oldItems.slice(idx + 1)
            ]);
            setShowDelBtn(false)
        } else {
            return;
        }
    };

    useEffect(() => console.log(ToDos), [ToDos]);

    return (
        <WeeklyWrapper>
            <AddWeeklyForms onSubmit={handleSubmit(onValid)}>
                <SelectBox {...register("WeeklyContents", {required: true})}>
                    {
                        WeeklyOriginData.map((originData) => {
                            const idx = ToDos.findIndex((data) => data.charNm === CharId.charNm);
                            //해당 캐릭터한테 할당된 파트가 있냐, 없냐 여부 체크
                            //있는 경우와 없는 경우 두 가지로 나눠서 생각했어야 했음.

                            const isItems = Items.findIndex((itemData) => originData.Id === itemData.ContentsId);
                            //Items 배열에 임시 저장된게 있냐 없냐 체크

                            //idx !== -1인 경우, 즉 할당된 파트가 있는 경우에서
                            //추가하려는 컨텐츠와 동일한게 있는지도 체크 해야함

                            //캐릭터 할당 파트 유무 
                            //Items 배열 임시저장 유무

                            return <ContentsItem key={originData.Id} isAdds={true} disabled>{originData.Name}</ContentsItem>
                        })
                    }
                </SelectBox>
                <button>임시 등록</button>
            </AddWeeklyForms>
            <WeeklyItemBox>
                <WeeklyItemHeader>주간 컨텐츠 목록</WeeklyItemHeader>
                <WeeklyItemList>
                    {
                        Items.map((todo) => {
                            return (
                                <WeeklyItem key={todo.ContentsNm} value={todo.ContentsId}>
                                    <label>{todo.ContentsNm}</label>
                                    <DelBtn isHide={ShowDelBtn} onClick={() => ItemDelete(todo.ContentsId)}>삭제</DelBtn>
                                </WeeklyItem>
                            );
                        })
                    }
                </WeeklyItemList>
                <BtnContainer>
                    <button onClick={WeeklySubmit}>등록</button>
                    <button onClick={() => setShowDelBtn((prev) => !prev)}>삭제</button>
                </BtnContainer>
            </WeeklyItemBox>
        </WeeklyWrapper>
    );
};

export default WeeklyForm;