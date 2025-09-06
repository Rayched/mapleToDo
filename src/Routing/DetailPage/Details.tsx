import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { A_CharNmSaves, A_MapleToDos, I_MapleToDos, OcidAtoms } from "../../Atoms";
import { useQuery } from "react-query";
import { getCharData } from "../../modules/Fetchs";
import Mains from "./ToDoList";
import { useEffect, useState } from "react";

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
    max-width: 650px;
    height: 95%;
    display: flex;
    flex-direction: column;
`;

const Headers = styled.header`
    padding: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 98%;
`;

const ImgBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 20%;
    height: 100%;
`;

const CharImgs = styled.img`
    position: absolute;
    height: 250px;
    top: -115px;
    z-index: 1;
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

const BookmarkBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: absolute;
    border: 2px solid black;
    border-radius: 25px;
    font-size: 25px;
    top: 0.5em;
    right: 1.5em;
`;
/**
 * Bookmark 추가 관련 버튼은 사이드바 쪽으로
 * 이관하는 방향으로 개발할 것
 */

function Details(){
    const [charID, setCharID] = useRecoilState(OcidAtoms);

    const DayTexts = ["일", "월", "화", "수", "목", "금", "토"];

    const [CharNmSave, setCharNmSave] = useRecoilState(A_CharNmSaves);
    const [isSaved, setSaved] = useState(false);

    const {isLoading, data: CharInfo} = useQuery<I_CharInfo>(
        "charData",
        () => getCharData(charID)
    );

    const SaveCharNm = async() => {
        const CharNms = charID.charNm;
        const isSames = CharNmSave.findIndex((data) => data === charID.charNm);

        if(CharNms !== "" && isSames === -1){
            if(CharNmSave.length === 3){
                const isDeletes = window.confirm("캐릭터는 총 3개까지만 저장 가능합니다.\n첫번째 캐릭터 데이터를 삭제하시겠습니까?");

                if(isDeletes){
                    await setCharNmSave((oldDatas) => [
                        ...oldDatas.slice(1),
                        String(CharNms)
                    ]);
                    alert(`'1번 슬롯 : ${CharNmSave[0]}'을 삭제하고\n'${CharNms}'을 새로 등록했습니다.`);
                } else {
                    return;
                }
            } else {
                await setCharNmSave((oldDatas) => [...oldDatas, String(CharNms)]);   
                alert(`'캐릭터 명: ${CharNms}' 저장 완료!`);
            }
        };
    };

    const targetIdx = WorldNms.findIndex((names) => CharInfo?.world_name === names);

    useEffect(() => {
        const isSames = CharNmSave.findIndex((data) => data === charID.charNm);
        if(isSames === -1){
            return;
        } else {
            setSaved(true);
        }
    }, []);

    return (
        <Wrapper>
            {
                isLoading ? "캐릭터 정보를 가져오고 있습니다.."
                : (
                    <>
                        <Headers>
                            <ImgBox>
                                <CharImgs src={CharInfo?.character_image} height="200"/>
                            </ImgBox>
                            <CharDatas>
                                <DataItem key="charInfos">
                                    {CharInfo?.character_name}
                                    <div className="worlds">
                                        <img src={`logos/world_icons/icon_${targetIdx}.png`} /> 
                                        {CharInfo?.world_name}
                                    </div>
                                </DataItem>
                                <DataItem>LV {CharInfo?.character_level}</DataItem>
                                <DataItem>{CharInfo?.character_class}</DataItem>
                            </CharDatas>
                            <BookmarkBtn onClick={SaveCharNm}>{isSaved ? "★" : "☆"}</BookmarkBtn>
                        </Headers>
                        <Mains />
                    </>
                )
            }
        </Wrapper>
    );
};

export default Details