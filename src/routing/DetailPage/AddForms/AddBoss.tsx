//Boss Contents ToDo Form Component
import {useRecoilState} from "recoil";
import styled from "styled-components";
import { OriginData } from "../../../modules/datas/originDatas";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { BossAtoms, I_BossAtoms } from "../../../Atoms";
import { I_ContentsItem, I_DelBtn } from "./AddWeeklys";
import { I_AddToDoParams } from "../AddToDo";

interface I_forms {
    BossName?: string;
}

interface I_Items {
    Id: string;
    Name: string;
    Rank?: string;
    Ranks?: string[];
};

interface I_RankSelectParams {
    targetId: string;
    rank: string;
};

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

function AddBossForm({setHide}: I_AddToDoParams){
    const [BossAtomData, setBossAtoms] = useRecoilState(BossAtoms);

    const BossDatas = OriginData.BossContents;
    //원본 보스 컨텐츠 데이터

    const [Items, setItems] = useState<I_Items[]>([]);

    const [ShowBtn, setShowBtn] = useState(false);

    const {register, handleSubmit} = useForm();

    const onValid = ({BossName}: I_forms) => {
        const idx = BossDatas.findIndex((elm) => BossName === elm.Name);
        const Targets = BossDatas[idx];

        //난이도 1개 이상/이하 구분
        if(Targets.Rank.length === 1){
            const TypeA: I_Items = {
                Id: Targets.Id,
                Name: Targets.Name,
                Rank: Targets.Rank[0],
                Ranks: []
            };
            setItems((oldItems) => [...oldItems, TypeA]);            
        } else {
            const TypeB: I_Items = {
                Id: Targets.Id,
                Name: Targets.Name,
                Rank: "",
                Ranks: Targets.Rank
            };
            setItems((oldItems) => [...oldItems, TypeB]);
        }
    };

    const RankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {name}} = event;
        const {currentTarget: {value}} = event;

        const idx = Items.findIndex((data) => data.Name === name);

        const EditData: I_Items = {
            Id: Items[idx].Id,
            Name: Items[idx].Name,
            Rank: value,
            Ranks: Items[idx].Ranks
        };

        setItems((oldItems) => [
            ...oldItems.slice(0, idx),
            EditData,
            ...oldItems.slice(idx + 1)
        ]);
    };

    const DataSubmit = () => {
        if(Items.length === 0){
            alert("등록된 주간 보스가 없습니다.");
            return;
        } else if(BossAtomData.length === 12){
            alert("주간 보스는 최대 12개까지만 등록할 수 있습니다.");
            setItems([]);
            setHide(false);
        } else {
           Items.forEach((bossItems) => {
                const SaveDatas: I_BossAtoms = {
                    monsterId: bossItems.Id,
                    monsterNm: bossItems.Name,
                    ranks: String(bossItems.Rank),
                    isDone: false
                };
                setBossAtoms((oldData) => [...oldData, SaveDatas]);
           });
           setHide(false);
        }
    };

    const ToDoDelete = (targetId: string) => {
        const idx = Items.findIndex((item) => targetId === item.Id);

        setItems((oldItems) => [
            ...oldItems.slice(0, idx),
            ...oldItems.slice(idx + 1)
        ]);
        setShowBtn(false);
    };

    return (
        <Wrapper>
            <AddForm onSubmit={handleSubmit(onValid)}>
                <SelectBox {...register("BossName", {required: true})}>
                    {
                        BossDatas.map((data) => {
                            //Boss 중복 등록 방지 logic
                            const isItem = Items.findIndex((item) => data.Id === item.Id);
                            const isBossAtom = BossAtomData.findIndex((atomData) => atomData.monsterId === data.Id);
                            //BossAtom에 해당 보스 콘텐츠가 등록됐는 지 여부 확인
                            //등록된게 없으면 -1을 return
                            //이를 통해서 중복 등록을 방지한다.

                            if(isItem !== -1 || isBossAtom !== -1){
                                return <ContentsItem key={data.Id} isAdds={true} disabled>{data.Name}</ContentsItem>
                            } else {
                                return <ContentsItem key={data.Id} isAdds={false}>{data.Name}</ContentsItem>
                            }
                        })
                    }
                </SelectBox>
                <button>등록</button>
            </AddForm>
            <ItemBox>
                <ItemHeader>주간 보스 목록</ItemHeader>
                <ul>
                    {
                        Items.map((data) => {
                            return (
                                <BossItem key={data.Id}>
                                    <label>{data.Name}</label>
                                    {
                                        data.Ranks?.length === 0 ? <RankBox>{data?.Rank}</RankBox>
                                        : (
                                            <select key={data.Id} name={data.Name} onChange={RankChange}>
                                                {data.Ranks?.map((elm) => <option key={elm} value={elm}>{elm}</option>)}
                                            </select>
                                        ) 
                                    }
                                    <DelBtn isHide={ShowBtn} onClick={() => ToDoDelete(data.Id)}>삭제</DelBtn>
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

export default AddBossForm;