import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Keys } from "../modules/Fetchs";
import { useSetRecoilState } from "recoil";
import { OcidAtoms } from "../Atoms";

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
    height: 7em;
    margin-top: 15px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgb(225, 218, 218);
`;

const B_Title = styled.div`
    font-size: 16px;
    font-weight: bold;
`;

const Bookmarks = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
`;

const Bookmark_Item = styled.li`
    width: 20em;
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
`;

/**
 * 성공 시
 * { ocid : "ocid..."}
 * 실패 시
 * {}
 */

function Home(){
    const Navigate = useNavigate();

    const setCharID = useSetRecoilState(OcidAtoms);

    const {register, handleSubmit, setValue} = useForm<I_Charactors>();

    const onValid = async(data: I_Charactors) => {
        const API_URLs = `https://open.api.nexon.com/maplestory/v1/id?character_name=${data.charNm}`;
        const API_Keys = Keys;

        const FindCharacterID = fetch(API_URLs, {
            headers: {
                "x-nxopen-api-key" : API_Keys
            }
        }).then((resp) => resp.json());

        const getDatas = await FindCharacterID.then((value) => value).catch((error) => error);
        const Outputs = await {...getDatas};

        if(Outputs.error){
            alert(`입력하신 닉네임을 다시 확인해주세요.\n{${Outputs.error?.message}, ${Outputs.error.name}}`);
            setValue("charNm", "");
        } else {
            await setCharID(Outputs);
            Navigate("/charToDo");
        }
    };

    return (
        <Homes>
            <Headers>
                <Icons src="logos/maple_icons.png"/>
                <Titles>메이플 스케줄러 in Web</Titles>
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
                <Bookmarks>
                </Bookmarks>
            </Bookmark_Box>
        </Homes>
    );
};

export default Home;