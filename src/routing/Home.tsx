import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { A_CharNmSaves, OcidAtoms } from "../Atoms";
import { API_Keys } from "../modules/datas/APIs";
import { useState } from "react";

interface I_Charactors {
    charNm: string;
}

interface I_Outputs {
    ocid?: string;
    error?: {
        message?: string;
        name?: string;
    }
};

interface I_EditMode {
    isEdits: boolean;
    isBookmark?: boolean;
};

const Homes = styled.div`
    width: 100%;
    height: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Headers = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0px;
    margin: 10px 0px;
`;

const Titles = styled.div`
    font-size: 2em;
    font-weight: bold;
    padding: 0px 5px;
`;

const Icons = styled.img`
    width: 2em;
    height: 2em;
    background: inherit;
`;

const Mains = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;

const CharacterForm = styled.form`
    padding: 5px;
    border: 2px solid black;
    border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(225, 218, 218);
`;

const SearchBar = styled.input`
    width: 30em;
    height: 2em;
    border: 0px;
    padding-left: 5px;
    background-color: inherit;

    &:focus {
        outline: none;
    }
`;

const SearchBtn = styled.button`
    width: 2.4em;
    height: 2em;
    background-color: inherit;
    border: 0px;
`;

const Bookmark_Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20em;
    height: 10em;
    margin-top: 15px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgb(225, 218, 218);
`;

const B_Title = styled.div`
    font-size: 16px;
    font-weight: bold;
`;

const EditBtn = styled.div<I_EditMode>`
    display: ${(props) => props.isBookmark ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    padding: 3px;
    margin-top: 6px;

    background-color: ${(props) => props.isEdits ? "rgb(108, 116, 126)" : "rgb(83, 92, 104)"};
    color: rgb(250, 250, 250);

    border: 2px solid black;
    border-radius: 10px;

    box-shadow: 0.2px 0.5px rgba(0, 0, 0, 0.8);

    .EditBtnText {
        padding: 0px 2px;
        margin: 0px 2px;
        font-weight: bold;
    };
`;

const Bookmarks = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
`;

const Bookmark_Item = styled.li<I_EditMode>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 20em;
    height: 1.5em;
    padding: 5px 0px;
    margin: 2px 0px;
    background-color: rgb(245, 240, 240);
    border-radius: 10px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    &:hover {
        background-color: rgb(250, 250, 250);
    };

    .BookmarkText {
        display: flex;
        justify-content: center;
        align-items: center;
        width: ${(props) => props.isEdits ? "90%" : "100%"};
    }
`;

const DeleteBtn = styled.div<I_EditMode>`
    display: ${(props) => props.isEdits ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    border: 2px solid white;
    border-radius: 25px;
    width: 1.3em;
    height: 1.3em;
    background-color: rgb(255, 121, 121);
    margin: 0px 2px;
`;

/**
 * 성공 시
 * { ocid : "ocid..."}
 * 실패 시
 * {}
 */

function Home(){
    const Navigate = useNavigate();

    const [SaveNms, setSaveNms] = useRecoilState(A_CharNmSaves);
    const setCharID = useSetRecoilState(OcidAtoms);

    const {register, handleSubmit, setValue} = useForm<I_Charactors>();

    const [Edits, setEdits] = useState(false);

    const onValid = async(data: I_Charactors) => {
        const API_URLs = `https://open.api.nexon.com/maplestory/v1/id?character_name=${data.charNm}`;
        const APIKeys = API_Keys;

        const FindCharacterID = fetch(API_URLs, {
            headers: {
                "x-nxopen-api-key" : APIKeys
            }
        }).then((resp) => resp.json());

        const getDatas = await FindCharacterID.then((value) => value).catch((error) => error);
        const Outputs = await {...getDatas};

        if(Outputs.error){
            alert(`입력하신 닉네임을 다시 확인해주세요.\n{${Outputs.error?.message}, ${Outputs.error.name}}`);
            setValue("charNm", "");
        } else {
            await setCharID({charNm: data.charNm, ocid: Outputs.ocid});
            Navigate("/charToDo");
        }
    };

    const DeleteBookmark = (charNm: string) => {
        const TargetIdx = SaveNms.findIndex((data) => data === charNm);

        if(TargetIdx === -1){
            return;
        } else {
            setSaveNms(() => {
                const value = SaveNms.filter((data) => data !== charNm);
                return value;
            });
            setEdits(false);
        };
    };

    return (
        <Homes>
            <Headers>
                <Icons src={`${process.env.PUBLIC_URL}/MapleIcon.png`} />
                <Titles>메이플 To Do</Titles>
            </Headers>
            <Mains>
                <CharacterForm onSubmit={handleSubmit(onValid)}>
                    <SearchBar 
                        type="text" 
                        placeholder="캐릭터 이름을 입력해주세요."
                        autoComplete="off"
                        {...register("charNm", {required: true})}
                    />
                    <SearchBtn>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                        </svg>
                    </SearchBtn>
                </CharacterForm>
            </Mains>
            <Bookmark_Box>
                <B_Title>북마크</B_Title>
                <EditBtn 
                    isEdits={Edits} 
                    isBookmark={SaveNms.length !== 0 ? true : false} 
                    onClick={() => setEdits((prev) => !prev)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="13" width="13" viewBox="0 0 512 512">
                        <path fill="rgb(225, 218, 218)" d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
                    </svg>
                    <span className="EditBtnText">편집</span>
                </EditBtn>
                <Bookmarks>
                    {
                        SaveNms.map((data) => {
                            const Converts: I_Charactors = {
                                charNm: data
                            };

                            return (
                                <Bookmark_Item isEdits={Edits} key={data}>
                                    <div className="BookmarkText" onClick={() => onValid(Converts)}>
                                        {data}
                                    </div>
                                    <DeleteBtn isEdits={Edits} onClick={() => DeleteBookmark(data)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 384 512">
                                            <path fill="rgb(250, 250, 250)" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                        </svg>
                                    </DeleteBtn>
                                </Bookmark_Item>
                            );
                        })
                    }
                </Bookmarks>
            </Bookmark_Box>
        </Homes>
    );
};

export default Home;