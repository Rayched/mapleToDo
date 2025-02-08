import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getCharData } from "../modules/Fetchs";
import { useEffect } from "react";
import styled from "styled-components";
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
    justify-content: center;
    align-items: center;
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
    /*
    const {isLoading, data} = useQuery<I_Character>(
        "characterData",
        () => getCharData(charNm),
        {retry: false}
    );

    useEffect(() => console.log(data), [isLoading]);

    return (
        <Wrapper>
            <Headers>
                <Characters>
                    <CharacterImgs src={data?.character_image}/>
                    <Character_data>
                        <div>{data?.character_name} / {data?.world_name}</div>
                        <div>직업: {data?.character_class}</div>
                        <div>LV {data?.character_level} ({data?.character_exp_rate} %)</div>
                        <div>길드: {data?.character_guild_name}</div>
                    </Character_data>
                </Characters>
            </Headers>
            <Schedules>
                <ToDoList />
            </Schedules>
        </Wrapper>
    );
    */
   return (
    <div>Detail Page</div>
   );
};

export default Detail;