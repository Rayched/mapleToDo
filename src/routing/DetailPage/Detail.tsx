import { useQuery } from "react-query";
import { getCharData } from "../../modules/Fetchs";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { OcidAtoms} from "../../Atoms";
import ToDoList from "./ToDoList";

interface I_Character {
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
}

const Wrapper = styled.div`
    width: 100%;
    height: 95%;
    display: flex;
    flex-direction: column;
`;

const Headers = styled.header`
    padding: 5px;
`;

const Characters = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    margin: 0px 10px;
`;

const CharacterImgs = styled.img`
    width: 6em;
    height: 7em;
    display: block;
`;

const Character_data = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
    font-size: 17px;
`;

const Schedules = styled.div`
    margin-top: 10px;
`;

const Worlds = [
    "헬리오스", "에오스", "오로라", "레드", "이노시스", "유니온", 
    "스카니아", "루나", "제니스", "크로아", "베라", "엘리시움", 
    "아케인", "노바", "챌린저스1", "챌린저스2", "챌린저스3", "챌린저스4"
];

function Detail(){
    const CharacterID = useRecoilValue(OcidAtoms);

    const {isLoading: InfoLoading, data: CharInfo} = useQuery<I_Character>(
        "characterData",
        () => getCharData(CharacterID),
    );

    const WorldIdx = Worlds.findIndex((worldNm) => worldNm === CharInfo?.world_name);

    return (
        <Wrapper>
            {
                InfoLoading ? "데이터를 가져오고 있습니다..."
                : (
                    <>
                        <Headers>
                            <Characters>
                                <CharacterImgs src={CharInfo?.character_image}/>
                                <Character_data>
                                    <div>
                                        {CharInfo?.character_name} / 
                                        <img src={`logos/icon_${WorldIdx}.png`} />
                                        {CharInfo?.world_name}
                                    </div>
                                    <div>직업: {CharInfo?.character_class}</div>
                                    <div>LV {CharInfo?.character_level} ({CharInfo?.character_exp_rate} %)</div>
                                    <div>길드: {CharInfo?.character_guild_name}</div>
                                </Character_data>
                            </Characters>
                        </Headers>
                        <Schedules>
                            <ToDoList />
                        </Schedules>
                    </>
                )
            }
        </Wrapper>
    );
};

export default Detail;