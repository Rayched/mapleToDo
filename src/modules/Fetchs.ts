import { getDateTimes } from "./Dates";

const Basic_URLs = "https://open.api.nexon.com/maplestory/v1";
export const Keys = "test_f9ce4c7a085ed69bb5ef5d0d3b21357108ddddce8dbccfe8ecd4ed6db3cf9d32e9083e276f87ffa64730923916d0d710";

interface I_Ocids {
    ocid: string;
}

export async function getCharData(charID : I_Ocids){
    const DateTimes = getDateTimes();

    //const characterURLs = Basic_URLs + `/character/basic?ocid=${charID}&date=${DateTimes}`;
    const characterURLs = Basic_URLs + `/character/basic?ocid=${charID}&date=2025-02-07`;
    //Test 용 URL (API 데이터 준비 중 이슈로 임의 날짜 설정)
    //2025-02-09 00:36 기준

    const CharacterData = await(await(
        await fetch(characterURLs, {
            headers: {
                "x-nxopen-api-key": Keys
            }
        })
    ).json());

    return CharacterData;
};