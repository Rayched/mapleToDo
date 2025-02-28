import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { OcidAtoms } from "../../Atoms";
import { useQuery } from "react-query";
import { getCharData } from "../../modules/Fetchs";
import Mains from "./Mains";

/**
 * Nexon api 통해 캐릭터 정보를 보여주고
 * 해당 캐릭터의 To Do List (별개 컴포넌트 분리)도
 * 같이 보여주는 Detail Page
 */

interface I_CharInfo {
    access_flag?: string;
    character_class?: string;
    character_class_level?: string;
    character_date_create?: string;
    character_exp?: number;
    character_exp_rate?: string;
    character_gender?: string;
    character_guild_name?: string;
    character_image?: string;
    character_level?: number;
    character_name?: string;
    date?: string;
    liberation_quest_clear_flag?: string;
    world_name?: string;
};

const WorldNms = [
    "헬리오스", "에오스", "오로라", "레드", "이노시스", "유니온", 
    "스카니아", "루나", "제니스", "크로아", "베라", "엘리시움", 
    "아케인", "노바", "챌린저스1", "챌린저스2", "챌린저스3", "챌린저스4"
];

const Wrapper = styled.div`
    width: 100%;
    height: 95%;
    display: flex;
    flex-direction: column;
`;

const Headers = styled.header`
    padding: 5px;
    display: flex;
    justify-content: center;
`;

const CharImgs = styled.img`
    width: 5em;
    height: 6em;
    display: block;
`;

const CharDatas = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
`;

const DataItem = styled.div`
    display: flex;
    align-items: center;
    .worlds {
        display: flex;
        margin: 0px 5px;
        background-color: lightgray;
        padding: 3px;
        border-radius: 15px;
    }
    img {
        margin: 0px 2px;
    }
`;

function NewDetail(){
    const CharId = useRecoilValue(OcidAtoms);

    const {isLoading, data: CharInfo} = useQuery<I_CharInfo>(
        "charData",
        () => getCharData(CharId)
    );

    const targetIdx = WorldNms.findIndex((names) => CharInfo?.world_name === names);

    return (
        <Wrapper>
            {
                isLoading ? "캐릭터 정보를 가져오고 있습니다.."
                : (
                    <>
                        <Headers>
                            <CharImgs src={CharInfo?.character_image} />
                            <CharDatas>
                                <DataItem key="charInfos">
                                    {CharInfo?.character_name}
                                    <div className="worlds">
                                        <img src={`logos/icon_${targetIdx}.png`} /> 
                                        {CharInfo?.world_name}
                                    </div>
                                </DataItem>
                                <DataItem>LV {CharInfo?.character_level}</DataItem>
                                <DataItem>{CharInfo?.character_class}</DataItem>
                            </CharDatas>
                        </Headers>
                        <Mains />
                    </>
                )
            }
        </Wrapper>
    );
};

export default NewDetail