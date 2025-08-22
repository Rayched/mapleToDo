import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { S_MapleToDos } from "../../../Atoms";
import BasedToDo from "./BasedToDo";

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

function BossItem(){
    const BossData = useRecoilValue(S_MapleToDos);

    return (
        <Container>
            {
                BossData?.map((todoData) => {
                    const idx = ColorInfos.findIndex((colors) => colors.key === todoData.Rank);
                    const ColorSelect = ColorInfos[idx];

                    return (
                        <BasedToDo key={todoData.ContentsId} ToDoId={todoData.ContentsId} isDones={todoData.IsDone}>
                            <ContentsBox>
                                <Icons src={`logos/boss_icons/${todoData.ContentsId}.png`}/>
                                <BossName>{todoData.ContentsNm}</BossName>
                                <Ranks rankInfo={todoData.Rank} ColorInfo={ColorSelect}>{todoData.Rank}</Ranks>
                            </ContentsBox>
                        </BasedToDo>
                    );
                })
            }
        </Container>
    );
};

export default BossItem;