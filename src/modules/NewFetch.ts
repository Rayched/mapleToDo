const Based_URL = "https://open.api.nexon.com/maplestory/v1";
const Keys = "test_f9ce4c7a085ed69bb5ef5d0d3b21357108ddddce8dbccfe8ecd4ed6db3cf9d32e9083e276f87ffa64730923916d0d710"

export function FindCharacter(charNm: string){
    const URLs = Based_URL + `/id?character_name=${charNm}`;

    const getOcid = fetch(URLs, {
        headers: {
            "x-nxopen-api-key": Keys
        }
    }).then((resp) => resp.json());

    return getOcid.then((data) => data.ocid).catch((error) => error);
}