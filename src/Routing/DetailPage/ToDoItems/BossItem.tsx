import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { S_MapleToDos } from "../../../Atoms";
import BasedToDo from "./BasedToDo";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * 주간 보스 카테고리에 해당하는
 * To Do Item들을 return하는 Component
 */

interface I_ColorInfos {
    key: string;
    textColor: string;
    bgColor: string;
    borderColor: string;
};

interface I_Ranks {
    rankInfo?: string;
    ColorInfo?: I_ColorInfos;
};

const Container = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ContentsBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: 5px;
    height: 300px;

    .UpBtn {
        border-top-right-radius: 15px;
        border-top-left-radius: 15px;
    };

    .DownBtn {
        border-bottom-right-radius: 15px;
        border-bottom-left-radius: 15px;
    };
`;

const ToDoItemBox = styled(motion.div)`
    width: 310px;
    height: 245px;
    padding: 3px 5px;
    border: 1px solid rgb(144, 144, 145);
    background-color: rgb(168, 169, 172);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ScrollBtn = styled.div`
    width: 310px;
    height: 20px;
    padding: 0px 5px;
    color: white;
    align-items: center;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.8);
    border: 1px solid black;
`;

const BossDataBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Icons = styled.img`
    padding: 2px;
    margin: 0px 5px;
`;

const BossName = styled.div`
    font-weight: bold;
    font-size: 15px;
    margin: 0px 5px;
`;

const Ranks = styled.div<I_Ranks>`
    font-size: 15px;
    background-image: ${(props) => `linear-gradient(150deg, ${props.ColorInfo?.bgColor})`};
    border: 1px solid ${(props) => `${props.ColorInfo?.borderColor}`};
    border-radius: 14px;
    padding: 2px 5px;
    color: ${(props) => `${props.ColorInfo?.textColor}`};
    font-weight: bold;
    text-align: center;
`;

const ColorInfos: I_ColorInfos[]= [
    {
        key: "이지",
        textColor: "black",
        bgColor: "#d7d5d5, #b7b5b5",
        borderColor: "#9c9c9c"
    },
    {
        key: "노멀",
        textColor: "white",
        bgColor: "#51b2cc, #319DBC",
        borderColor: "#51b2cc"
    },
    {
        key: "하드",
        textColor: "white",
        bgColor: "#bb4466, #aa3355",
        borderColor: "#bb4466"
    },
    {
        key: "카오스",
        textColor: "#ffe1be",
        bgColor: "#333333, #222233",
        borderColor: "#ffe1be"
    },
    {
        key: "익스트림",
        textColor: "#ee3355",
        bgColor: "#333333, #222233",
        borderColor: "#ee3355"
    }
];

const ContentsLengths = styled.div`
    width: 65%;
    max-width: 300px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-weight: bold;
    color: rgb(240, 240, 240);
    background-color: rgb(83, 92, 104);
    border-radius: 10px;
    padding: 5px 4px;
    margin: 3px 0px;
`;

function BossItem(){
    const BossData = useRecoilValue(S_MapleToDos);

    const [Maximum, setMaximum] = useState(0);
    const [Index, setIndex] = useState(0);

    const IsEmptys = BossData === null;

    const offset = 6;

    const ItemScroll = (BtnId: string) => {
        if(Number(BossData?.length) < 7 || IsEmptys){
            return;
        } else {
            if(BtnId === "Up"){
                setIndex(0);
            } else {
                setIndex(1);
            }
        } 
    };

    useEffect(() => {
        setMaximum(Number(BossData?.length));
        console.log(BossData);
    }, [BossData]);

    return (
        <Container>
            <ContentsLengths>
                {
                    IsEmptys ? "주간 보스 (0 / 0)"
                    : `주간 보스 (${BossData?.filter((data) => data.IsDone).length} / ${Maximum})`
                }
            </ContentsLengths>
            <ContentsBox>
                <ScrollBtn className="UpBtn" onClick={() => ItemScroll("Up")}>Up</ScrollBtn>
                    <ToDoItemBox>
                        {
                            BossData?.slice(Index * offset, Index * offset + offset).map((todoData) => {
                                const idx = ColorInfos.findIndex((colors) => colors.key === todoData.Rank);
                                const ColorSelect = ColorInfos[idx];

                                return (
                                    <BasedToDo key={todoData.ContentsId} ToDoId={todoData.ContentsId} isDones={todoData.IsDone}>
                                        <BossDataBox>
                                            <Icons src={`logos/boss_icons/${todoData.ContentsId}.png`}/>
                                            <BossName>{todoData.ContentsNm}</BossName>
                                            <Ranks rankInfo={todoData.Rank} ColorInfo={ColorSelect}>{todoData.Rank}</Ranks>
                                        </BossDataBox>
                                    </BasedToDo>
                                );
                            })
                        }
                    </ToDoItemBox>
                <ScrollBtn className="DownBtn" onClick={() => ItemScroll("Down")}>Down</ScrollBtn>
            </ContentsBox>
        </Container>
    );
};

export default BossItem;