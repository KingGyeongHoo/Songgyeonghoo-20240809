import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { Carousel } from "./Components/Carousel";

export const LureDealSection = () => {
    const [lureDealData, setLureDealData] = useState([])

    useEffect(() => {
        const getLureDealData = async () => {
          try {
            const response = await axios.get('https://assignment-front.ilevit.com/deals/lure-deal');
            setLureDealData(response.data);
          } catch (err) {
            console.log('Error')
          }
        };
    
        getLureDealData();
      }, []);

    return (
        <LureDealContainer>
            <LureDealTitleContainer>
                <LureDealTitle>오늘만 이 가격, 순삭특가!</LureDealTitle>
            </LureDealTitleContainer>
            <Carousel data={lureDealData} dealType={'LURE'}></Carousel>
        </LureDealContainer>
    )
}

const LureDealContainer = styled.div`
    width: 100%;
    height: 321px;
    background-color: ${({theme}) => theme.Color.Orange500};
`

const LureDealTitleContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 52px;
    padding: 0 16px;
    margin-bottom: 10px;
`

const LureDealTitle = styled.h1`
    font-size: 20px;
    font-weight: bold;
    color: ${({theme}) => theme.Color.white};
`