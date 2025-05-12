//Boss Contents ToDo Form Component
import {useRecoilState, useRecoilValue} from "recoil";
import styled from "styled-components";
import { OriginData } from "../../../modules/datas/originDatas";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { A_MapleToDos, BossAtoms, I_BossAtoms, I_BossToDos, I_MapleToDos, OcidAtoms } from "../../../Atoms";
import { I_ContentsItem, I_DelBtn } from "./WeeklyForms";
import { I_AddToDoParams } from "./FormBox";

interface I_forms {
    BossName?: string;
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const AddForm = styled.form`
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
    text-decoration: ${(props) => props.isAdds ? "line-through" : "none"};
`;


const ItemBox = styled.div`
    width: 15em;
    height: 20em;
    background-color: rgb(216, 213, 213);
    border-radius: 15px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    ul {
        width: 100%;
        height: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
    };
`;

const ItemHeader = styled.div`
    width: inherit;
    padding: 5px 0px;
    font-size: 15px;
    font-weight: bold;
    background-color: rgb(230, 225, 225);
    text-align: center;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
`;

const BossItem = styled.li`
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
    height: 1.2em;

    label {
        padding: 0px 1px;
        font-size: 14px;
    };
`;

const RankBox = styled.div`
    display: flex;
    background-color: white;
    padding: 3px;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 13px;
`;

const BtnContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const DelBtn = styled.button<I_DelBtn>`
    display: ${(props) => props.isHide ? "flex" : "none"};
    margin: 0px 3px;
`;

function BossForm({setHide}: I_AddToDoParams){
    const {register, handleSubmit} = useForm();

    const [Items, setItems] = useState<I_BossToDos[]>([]);
    const [ShowBtn, setShowBtn] = useState(false);

    const [ToDos, setToDos] = useRecoilState(A_MapleToDos);

    const CharId = useRecoilValue(OcidAtoms);

    const BossOriginData = OriginData.BossContents;
    //OriginData, 보스 컨텐츠 정보 가져오는 용도

    const onValid = ({BossName}: I_forms) => {
        const idx = BossOriginData.findIndex((elm) => BossName === elm.Name);
        const Targets = BossOriginData[idx];

        //난이도 1개 이상/이하 구분
        if(Targets.Rank.length === 1){
            const TypeA: I_BossToDos = {
                BossId: Targets.Id,
                BossNm: Targets.Name,
                Rank: Targets.Rank[0],
                IsDone: false
            };
            setItems((oldItems) => [...oldItems, TypeA]);            
        } else {
            const TypeB: I_BossToDos = {
                BossId: Targets.Id,
                BossNm: Targets.Name,
                Ranks: Targets.Rank,
                IsDone: false
            };
            setItems((oldItems) => [...oldItems, TypeB]);
        }
    };

    const RankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {name}} = event;
        const {currentTarget: {value}} = event;

        const idx = Items.findIndex((data) => data.BossNm === name);

        const EditData: I_BossToDos = {
            BossId: Items[idx].BossId,
            BossNm: Items[idx].BossNm,
            Rank: value,
            Ranks: Items[idx].Ranks,
            IsDone: Items[idx].IsDone
        };

        setItems((oldItems) => [
            ...oldItems.slice(0, idx),
            EditData,
            ...oldItems.slice(idx + 1)
        ]);
    };

    const DataSubmit = () => {
        //임시 저장소, Items에 저장된 ToDo가 0개 미만인 경우
        //해당 캐릭터 이름의 ToDo 저장소 없을 경우, 있을 경우
        if(Items.length === 0){
            alert("보스 컨텐츠를 추가하지 않았습니다!");
            return;
        } else {
            const TargetIdx = ToDos.findIndex((data) => data.charNm === CharId.charNm);
            
            //해당 캐릭터에게 할당된 저장소가 없는 경우
            if(TargetIdx === -1){
                const newCharData: I_MapleToDos = {
                    charNm: String(CharId.charNm),
                    ocids: CharId.ocid,
                    WeeklyToDos: [],
                    BossToDos: [...Items],
                    CustomToDos: []
                };
                setToDos((oldToDos) => [...oldToDos, newCharData]);
            } else {
                //해당 캐릭터 명의 저장소가 존재하는 경우
                //기존 데이터 + 새로 추가한 데이터 합차는 식으로 구현
                //Array.concat()
                const Targets = ToDos[TargetIdx];
                //해당 캐릭터 명의 저장소 가져옴

                const EditBossContents = Targets.BossToDos?.concat(Items);

                const UpdateCharData: I_MapleToDos = {
                    charNm: Targets.charNm,
                    ocids: Targets.ocids,
                    WeeklyToDos: Targets.WeeklyToDos,
                    BossToDos: EditBossContents,
                    CustomToDos: Targets.CustomToDos
                };

                setToDos((oldToDos) => [
                    ...oldToDos.slice(0, TargetIdx),
                    UpdateCharData,
                    ...oldToDos.slice(TargetIdx + 1)
                ]);
            }
            setItems([]);
            setHide(false);
        }
    };

    const ToDoDelete = (targetId: string) => {
        const idx = Items.findIndex((item) => targetId === item.BossId);

        setItems((oldItems) => [
            ...oldItems.slice(0, idx),
            ...oldItems.slice(idx + 1)
        ]);

        setShowBtn(false);
    };

    useEffect(() => console.log(ToDos), [ToDos]);

    return (
        <Wrapper>
            <AddForm onSubmit={handleSubmit(onValid)}>
                <SelectBox {...register("BossName", {required: true})}>
                    {
                        BossOriginData.map((originData) => {
                            let isActive: boolean = true;

                            //해당 캐릭터 이름의 저장소 유무 체크
                            const idx = ToDos.findIndex((todoData) => todoData.charNm === CharId.charNm);

                            //임시 저장소, Items에 저장해둔 컨텐츠 유무 체크
                            const isItems = Items.findIndex((itemData) => itemData.BossId === originData.Id);

                            if(idx === -1){
                                if(isItems === -1){
                                    isActive = true;
                                } else {
                                    isActive = false;
                                }
                            } else {
                                const getTargets = ToDos[idx].BossToDos;
                                const isSameContents = getTargets?.findIndex((targetData) => targetData.BossId === originData.Id);

                                if(isItems === -1 && isSameContents === -1){
                                    isActive = true;
                                } else {
                                    isActive = false;
                                }
                            }

                            return (
                                <ContentsItem 
                                    key={originData.Id} 
                                    isAdds={isActive ? false : true}
                                    disabled={isActive ? false : true}
                                >{originData.Name}</ContentsItem>
                            );
                        })
                    }
                </SelectBox>
                <button>임시 등록</button>
            </AddForm>
            <ItemBox>
                <ItemHeader>주간 보스 목록</ItemHeader>
                <ul>
                    {
                        Items.map((data) => {
                            return (
                                <BossItem key={data.BossId}>
                                    <label>{data.BossNm}</label>
                                    {
                                        data.Ranks?.length === 0 ? <RankBox>{data?.Ranks[0]}</RankBox>
                                        : (
                                            <select key={data.BossId} name={data.BossNm} onChange={RankChange}>
                                                {data.Ranks?.map((elm) => <option key={elm} value={elm}>{elm}</option>)}
                                            </select>
                                        ) 
                                    }
                                    <DelBtn isHide={ShowBtn} onClick={() => ToDoDelete(data.BossId)}>삭제</DelBtn>
                                </BossItem>
                            );
                        })
                    }
                </ul>
                <BtnContainer>
                    <button onClick={DataSubmit}>등록</button>
                    <button onClick={() => setShowBtn((prev) => !prev)}>삭제</button>
                </BtnContainer>
            </ItemBox>
        </Wrapper>
    );
};

export default BossForm;