import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getCharData } from "../modules/Fetchs";
import { useEffect } from "react";
import styled from "styled-components";
import ToDoList from "./ToDoList";
import { useRecoilValue } from "recoil";
import { OcidAtoms } from "../Atoms";

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
    display: flex;
    justify-content: center;
`;

const Characters = styled.div`
    display: flex;
    align-items: center;
`;

const CharacterImgs = styled.img`
    width: 5.5em;
    height: 6em;
    display: block;
`;

const Character_data = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
`;

const Schedules = styled.div``;

function Detail(){
    const CharacterID = useRecoilValue(OcidAtoms);

    const {isLoading: InfoLoading, data: CharInfo} = useQuery<I_Character>(
        "characterData",
        () => getCharData(CharacterID),
        {retry: false}
    );

    useEffect(() => console.log(CharacterID, CharInfo), [InfoLoading]);

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
                                    <div>{CharInfo?.character_name} / {CharInfo?.world_name}</div>
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