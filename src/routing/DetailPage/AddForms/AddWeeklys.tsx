//Weekly Contents To Do form components

import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {OriginData} from "../../../modules/datas/originDatas";
import { I_WeeklyAtoms, WeeklyAtoms } from "../../../Atoms";
import { I_AddToDoParams } from "../AddToDo";
import React, { useEffect, useState } from "react";

interface I_WeeklyForms {
    WeeklyContents?: string;
};

interface I_DelBtn {
    isHide: boolean;
};

interface I_ContentsItem {
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

function AddWeeklyForm({setHide}: I_AddToDoParams){
    const {register, handleSubmit} = useForm();

    const [Items, setItems] = useState<I_WeeklyAtoms[]>([]);
    const [ShowDelBtn, setShowDelBtn] = useState(false);

    const Weeklys = OriginData.WeeklyContents;

    const [WeeklyAtomData, setWeeklyAtoms] = useRecoilState(WeeklyAtoms);

    const onValid = ({WeeklyContents}: I_WeeklyForms) => {
        const idx = Weeklys.findIndex((data) => WeeklyContents === data.Name);
        const SelectedItem = Weeklys[idx];

        const AddWeeklyData: I_WeeklyAtoms = {
            contentsNm: SelectedItem.Name,
            contentsId: SelectedItem.Id,
        };

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

    const ItemDelete = (ItemId?: string) => {
        const idx = Items.findIndex((elm) => ItemId === elm.contentsId);
        const DeleteCheck = window.confirm(`{contentsNm: ${Items[idx].contentsNm}}을 삭제하시겠습니까?`);

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

    return (
        <WeeklyWrapper>
            <AddWeeklyForms onSubmit={handleSubmit(onValid)}>
                <SelectBox {...register("WeeklyContents", {required: true})}>
                    {
                        Weeklys.map((data) => {
                            const isSame = WeeklyAtomData.findIndex((atomData) => data.Id === atomData.contentsId);

                            if(isSame === -1){
                                return <ContentsItem key={data.Id} isAdds={false}>{data.Name}</ContentsItem>
                            } else {
                                return <ContentsItem key={data.Id} isAdds={true} disabled>{data.Name}</ContentsItem>
                            }
                        })
                    }
                </SelectBox>
                <button>등록</button>
            </AddWeeklyForms>
            <WeeklyItemBox>
                <WeeklyItemHeader>주간 컨텐츠 목록</WeeklyItemHeader>
                <WeeklyItemList>
                    {
                        Items.map((todo) => {
                            return (
                                <WeeklyItem key={todo.contentsNm} value={todo.contentsId}>
                                    <label>{todo.contentsNm}</label>
                                    <DelBtn isHide={ShowDelBtn} onClick={() => ItemDelete(todo.contentsId)}>삭제</DelBtn>
                                </WeeklyItem>
                            );
                        })
                    }
                </WeeklyItemList>
                <BtnContainer>
                    <button onClick={WeeklySubmit}>등록</button>
                    <button onClick={() => setShowDelBtn(true)}>삭제</button>
                </BtnContainer>
            </WeeklyItemBox>
        </WeeklyWrapper>
    );
};

export default AddWeeklyForm;