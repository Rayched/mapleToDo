import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getCharData } from "./Fetchs";
import { getDateTimes } from "./Dates";

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

function ToDoList(){
    const {charNm} = useParams();
    const DateTimes = getDateTimes();

    const TargetDts = DateTimes.join("-");

    const {isLoading, data, error} = useQuery<I_Character>(
        "characters",
        () => getCharData({
            charNm: String(charNm),
            targetDt: TargetDts
        })
    );

    return (
        <div>
            {
                isLoading ? "캐릭터 정보를 가져오고 있습니다..."
                : (
                    <div>
                        <div>이름: {data?.character_name}</div>
                        <div>레벨: {data?.character_level}</div>
                        <div>월드: {data?.world_name}</div>
                        <div style={{width: 200, height: 200}}>
                            <img src={data?.character_image}/>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ToDoList;