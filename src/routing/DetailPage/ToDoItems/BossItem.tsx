import styled from "styled-components";

interface I_Ranks {
    rankInfo: string;
};

const Container = styled.li``;

const Icons = styled.img``;

const Ranks = styled.div<I_Ranks>`
    background-color: ${(props) => {
        switch(props.rankInfo){
            case "이지":
                return "linear-gradient(top-bottom, #888888, #666666)";
            case "노멀":
                return "linear-gradient(top-bottom, #51B2CC, #319DBC)";
            case "카오스":
                return "linear-gradient(top-bottom, #333333, #222233);"
            case "하드":
                return "linear-gradient(top-bottom, #bb4466, #aa3355)";
            case "익스트림":
                return "linear-gradient(top-bottom,)";
        }
    }};
`;

function BossItem(){
    return (
        <Container></Container>
    );
};

export default BossItem;