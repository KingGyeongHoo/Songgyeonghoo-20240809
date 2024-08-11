import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { Carousel } from "./Components/Carousel";
import { ErrorComponent } from "@/pages/Error";

export const LureDealSection = () => {
    const [lureDealData, setLureDealData] = useState([])
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const getLureDealData = async () => {
          try {
            const response = await axios.get('https://assignment-front.ilevit.com/deals/lure-deal');
            const newData = response.data;

            setLureDealData(newData);
          } catch (err) {
            console.log('Error')
            setIsError(true)
          }
        };
    
        getLureDealData();
      }, []);

    return (
        <LureDealContainer>
            {isError && <ErrorComponent />}
            <LureDealTitleContainer>
                <LureDealTitle>오늘만 이 가격, 순삭특가!</LureDealTitle>
            </LureDealTitleContainer>
            <Carousel data={lureDealData} dealType={'LURE'}></Carousel>
        </LureDealContainer>
    )
}

const LureDealContainer = styled.div`
    position: relative;
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