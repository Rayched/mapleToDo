import { getDateTimes } from "./Dates";

const Basic_URLs = "https://open.api.nexon.com/maplestory/v1";
export const Keys = "test_f9ce4c7a085ed69bb5ef5d0d3b21357108ddddce8dbccfe8ecd4ed6db3cf9d32e9083e276f87ffa64730923916d0d710";

interface I_Ocids {
    ocid: string;
}

export async function TestFetch(charID: string) {
    return charID;
}

export async function getCharData(CharID: I_Ocids){
    const DateTimes = getDateTimes();

    const characterURLs = Basic_URLs + `/character/basic?ocid=${CharID.ocid}&date=${DateTimes}`;

    const CharacterData = await(await(
        await fetch(characterURLs, {
            headers: {
                "x-nxopen-api-key": Keys
            }
        })
    ).json());

    return CharacterData;
};