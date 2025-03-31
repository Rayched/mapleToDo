//Boss Contents ToDo Form Component
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { BossContentAtoms, I_BossContentAtoms } from "../../../modules/datas/originDatas";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { BossAtoms, I_BossAtoms } from "../../../Atoms";
import { watch } from "fs";

interface I_forms {
    BossContents?: string;
}

interface I_Items {
    Id: string;
    Name: string;
    RankList?: string[];
    Rank?: string;
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

    .singleRanks {
        display: flex;
        background-color: white;
        padding: 3px;
        border: 1px solid black;
        border-radius: 5px;
        font-size: 13px;
    }
`;

function AddBossForm(){
    const [BossData, setBossData] = useRecoilState(BossContentAtoms);
    const setBossAtoms = useSetRecoilState(BossAtoms);
    const [Items, setItems] = useState<I_Items[]>([]);
    const {register, handleSubmit} = useForm();

    const onValid = ({BossContents}: I_forms) => {
        const idx = BossData.findIndex((elm) => BossContents === elm.Name);
        const Targets = BossData[idx];

        if(Targets.Rank.length === 1){
            setItems((oldItems) => {
                const Convert: I_Items = {
                    Id: Targets.Id,
                    Name: Targets.Name,
                    Rank: Targets.Rank[0]
                };

                return [...oldItems, Convert];
            });
        } else {
            setItems((oldItems) => {
                const Convert: I_Items = {
                    Id: Targets.Id,
                    Name: Targets.Name,
                    Rank: "",
                    RankList: [...Targets.Rank]
                };
                return [...oldItems, Convert];
            })
        }
    };

    const RankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {currentTarget: {name}} = event;
        const {currentTarget: {value}} = event;

        const idx = Items.findIndex((data) => data.Name === name);

        const EditData: I_Items = {
            Id: Items[idx].Id,
            Name: Items[idx].Name,
            RankList: undefined,
            Rank: value
        };

        setItems((oldItems) => [
            ...oldItems.slice(0, idx),
            EditData,
            ...oldItems.slice(idx + 1)
        ]);
    };

    const BossSubmit = () => {
        if(Items.length === 0){
            alert("등록된 주간 보스가 없습니다.");
            return;
        } else {
            Items.forEach((contents) => {
                const idx = BossData.findIndex((origin) => contents.Id === origin.Id);
                setBossData((NonTargets) => {
                    const convert: I_BossContentAtoms = {
                        Id: BossData[idx].Id,
                        Name: BossData[idx].Name,
                        Rank: [...BossData[idx].Rank],
                        isAdds: true
                    };
                    return [
                        ...NonTargets.slice(0, idx),
                        convert,
                        ...NonTargets.slice(idx + 1)
                    ];
                });
                setItems([]);
                setBossAtoms((oldData) => {
                    const Convert: I_BossAtoms = {
                        monsterId: contents.Id,
                        monsterNm: contents.Name,
                        ranks: String(contents.Rank),
                        isDone: false
                    };
                    return [...oldData, Convert]
                });
            })
        }
    };

    return (
        <Wrapper>
            <AddForm onSubmit={handleSubmit(onValid)}>
                <SelectBox {...register("BossContents", {required: true})}>
                    {
                        BossData.map((data) => {
                            return <option key={data.Id}>{data.Name}</option>
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
                                    {data.Rank !== "" ? <span>{data.Rank}</span> : null}
                                    {data.Rank === "" ? (
                                        <select key={data.Id} name={data.Name} onChange={RankChange}>
                                            {data.RankList?.map((elm) => <option key={elm} value={elm}>{elm}</option>)}
                                        </select>
                                    ): null}
                                </BossItem>
                            );
                        })
                    }
                </ul>
                <button onClick={BossSubmit}>등록</button>
                <button>삭제</button>
            </ItemBox>
        </Wrapper>
    );
};

export default AddBossForm;