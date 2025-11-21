import { I_Ocids } from "../Atoms";

const Basic_URLs = "https://open.api.nexon.com/maplestory/v1";

const APIKeys = process.env.REACT_APP_NEXON_OPEN_API_KEY;

export async function TestFetch(charID: string) {
    return charID;
}

export async function getCharData(charID: I_Ocids){
    const characterURLs = Basic_URLs + `/character/basic?ocid=${charID.ocid}`;

    const CharacterData = await(await(
        await fetch(characterURLs, {
            headers: {
                "x-nxopen-api-key": `${APIKeys}`
            }
        })
    ).json());

    return CharacterData;
};