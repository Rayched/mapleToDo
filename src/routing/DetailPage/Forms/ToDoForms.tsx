import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { A_MapleToDos, CustomToDoAtoms, I_CustomToDoAtoms, I_CustomToDos, I_MapleToDos, OcidAtoms } from "../../../Atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { I_AddToDoParams } from "./FormBox";

interface I_FormData {
    Title?: string;
    Bodys?: string;
    startDt?: string;
    endDt?: string;
}

const CustomWrapper = styled.div`
    margin-top: 10px;
    width: 25em;
    height: 30em;
    background-color: rgb(212, 208, 208);
    border-radius: 15px;
`;

const CustomForms = styled.form`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px 0px;
`;

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px 0px;

    .Labels {
        font-weight: bold;
    }

    input {
        margin-top: 3px;
    };
`;

const SubmitBtn = styled.button``;

function ToDoForms({setHide}: I_AddToDoParams){
    const {register, handleSubmit, setValue} = useForm();

    const [ToDos, setToDos] = useRecoilState(A_MapleToDos);
    const CharId = useRecoilValue(OcidAtoms);

    const onValid = ({Title, Bodys, openDt, endDt}: I_CustomToDos) => {
        const ToDoData: I_CustomToDos = {
            Title: String(Title),
            Bodys: Bodys,
            openDt: openDt,
            endDt: endDt
        };

        const TargetIdx = ToDos.findIndex((targetData) => targetData.charNm === CharId.charNm);

        if(TargetIdx === -1){
            const DataConversion: I_CustomToDos[] = [ToDoData];

            const NewCharData: I_MapleToDos = {
                charNm: String(CharId.charNm),
                ocids: CharId.ocid,
                WeeklyToDos: [],
                BossToDos: [],
                CustomToDos: DataConversion
            };

            setToDos((oldToDos) => [...oldToDos, NewCharData]);
        } else {
            const Targets = ToDos[TargetIdx];

            const UpdateCustomToDo = Targets.CustomToDos?.concat(ToDoData);

            const ModifyData: I_MapleToDos = {
                charNm: Targets.charNm,
                ocids: Targets.ocids,
                WeeklyToDos: Targets.WeeklyToDos,
                BossToDos: Targets.BossToDos,
                CustomToDos: UpdateCustomToDo
            };

            setToDos((oldToDos) => [
                ...oldToDos.slice(0, TargetIdx),
                ModifyData,
                ...oldToDos.slice(TargetIdx + 1)
            ]);
        }
        setValue("Title", "");
        setValue("Bodys", "");
        setValue("startDt", "");
        setValue("EndDt", "");

        setHide(false);
    };

    useEffect(() => console.log(ToDos), [ToDos]);

    return (
        <CustomWrapper>
            <CustomForms onSubmit={handleSubmit(onValid)}>
                <InputBox>
                    <span className="Labels">일정 제목</span>
                    <input 
                        type="text" 
                        placeholder="일정의 제목을 입력해주세요."
                        {...register("Title", {required: true})}
                    />
                </InputBox>
                <InputBox>
                    <span className="Labels">시작일 ~ 종료일</span>
                    <div>
                        <input type="date" {...register("openDt")}/>
                        ~
                        <input type="date" {...register("endDt")}/>
                    </div>
                </InputBox>
                <InputBox>
                    <span className="Labels">일정 상세 내용</span>
                    <input type="text" placeholder="일정의 상세 내용을 입력해주세요." {...register("Bodys")}/>
                </InputBox>
                <SubmitBtn>등록하기</SubmitBtn>
            </CustomForms>
        </CustomWrapper>
    );
};

export default ToDoForms;