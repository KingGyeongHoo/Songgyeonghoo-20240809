import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { Carousel } from "./Components/Carousel";

interface BrandDealSummaryProps {
    onClickHandler: () => void;
}

export const BrandDealSection: React.FC<BrandDealSummaryProps> = ({onClickHandler}) => {
    const [brandDealData, setBrandDealData] = useState([])

    useEffect(() => {
        const getBrandDealData = async () => {
          try {
            const response = await axios.get('https://assignment-front.ilevit.com/deals/brand-deal?page=1');
            setBrandDealData(response.data.itemList);
          } catch (err) {
            console.log('Error')
          }
        };
    
        getBrandDealData();
      }, []);

    return (
        <BrandDealContainer>
            <BrandDealTitleContainer>
                <BrandDealTitle>오늘의 브랜드딜</BrandDealTitle>
                <ShowAllBrandDeal onClick={onClickHandler}>전체보기</ShowAllBrandDeal>
            </BrandDealTitleContainer>
            <Carousel data={brandDealData} dealType={'BRAND'}></Carousel>
        </BrandDealContainer>
    )
}

const BrandDealContainer = styled.div`
    width: 100%;
    height: 309px;
    background-color: ${({theme}) => theme.Color.white};
`

const BrandDealTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 57px;
    padding: 0 16px;
    margin-bottom: 10px;
`

const BrandDealTitle = styled.h1`
    font-size: 18px;
    font-weight: bold;
    color: ${({theme}) => theme.Color.black};
`

const ShowAllBrandDeal = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: ${({theme}) => theme.Color.Gray400};
`