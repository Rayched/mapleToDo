import { I_Ocids } from "../Atoms";
import { getDateTimes } from "./Dates";

const Basic_URLs = "https://open.api.nexon.com/maplestory/v1";
export const Keys = "test_9541dd4a161d499a14421efc454b8f04231afa9997783b8f8cb44996c0dab3f9efe8d04e6d233bd35cf2fabdeb93fb0d";

export async function TestFetch(charID: string) {
    return charID;
}

export async function getCharData(charID: I_Ocids){
    const DateTimes = getDateTimes();

    const characterURLs = Basic_URLs + `/character/basic?ocid=${charID.ocid}&date=${DateTimes}`;

    const CharacterData = await(await(
        await fetch(characterURLs, {
            headers: {
                "x-nxopen-api-key": Keys
            }
        })
    ).json());

    return CharacterData;
};