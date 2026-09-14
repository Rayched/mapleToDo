"use client"

import styled from "styled-components";

/**
 * 'chartodos'
 * 북마크 아이템, 스케줄 미리보기 목록
 */

const Container = styled.div`
    width: 100%;
    max-width: 450px;
    height: 100%;
    max-height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: lightgray;
    border-radius: 5px;
`;

export default function QuickSchedules(){
    return (
        <Container></Container>
    );
}