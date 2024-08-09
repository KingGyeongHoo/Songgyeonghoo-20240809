import { useEffect, useState } from "react";
import styled from "styled-components";

import { ContentDataProps } from "./Carousel";

export interface DiscountType {
    type : 'RATE' | 'PRICE'
}

export type Content = {content: ContentDataProps}

export const BrandDealCarouselContent= ({content} : Content) => {
    const [lastTime, setLastTime] = useState('')

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(content.discountEndDate){
                const endDate = new Date(content.discountEndDate).getTime()
                const curDate = new Date().getTime()
            
                const timeLeft = endDate - curDate;
            
                const hours = Math.floor(timeLeft / (1000 * 60 * 60))
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
            
                if (timeLeft <= 0) {
                    setLastTime("할인 종료")
                } else {
                    setLastTime(`${hours}시간 ${minutes}분 ${seconds}초`)
                }
            }
        }, 1000)
        return () => {
          clearInterval(intervalId)
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    return(
        <BrandDealCarouselContentDiv>
            <BrandDealCarouselContentImgDiv>
                <BrandDealCarouselContentImg src={content.image}></BrandDealCarouselContentImg>
            </BrandDealCarouselContentImgDiv>
            <BrandDealCarouselContentDescDiv>
                <BrandDealCarouselContentLastTiemDiv>{lastTime}</BrandDealCarouselContentLastTiemDiv>
                <BrandDealCarouselContentTitle>{content.title}</BrandDealCarouselContentTitle>
                <BrandDealCarouselContentDiscountDiv>
                    <BrandDealCarouselContentDiscount type={'RATE'}>{content.discountRate}%</BrandDealCarouselContentDiscount>
                    <BrandDealCarouselContentDiscount type={'PRICE'}>{content.discountedPrice.toLocaleString()}원</BrandDealCarouselContentDiscount>
                </BrandDealCarouselContentDiscountDiv>
            </BrandDealCarouselContentDescDiv>
            
        </BrandDealCarouselContentDiv>
    )
}

const BrandDealCarouselContentDiv = styled.div`
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    justify-content: space-between;
    width: 120px;
    height: 212px;
    background-color: ${({theme}) => theme.Color.white};
    font-size: 14px;
    margin: 0 6px;
    overflow: hidden;
`

const BrandDealCarouselContentImgDiv = styled.div`
    width: 120px;
    height: 120px;
`

const BrandDealCarouselContentImg = styled.img`
    width:100%;
    height: 100%;
    border-radius: 8px;
`

const BrandDealCarouselContentDescDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 120px;
    height: 86px;
    margin: 0 10px;
`
const BrandDealCarouselContentLastTiemDiv = styled.div`
    width: fit-content;
    height: 18px;
    background-color: ${({theme}) => theme.Color.Red50};
    color: ${({theme}) => theme.Color.Primary500};
    padding: 2px 4px;
`

const BrandDealCarouselContentTitle = styled.div`
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`
const BrandDealCarouselContentDiscountDiv = styled.div`
    display: flex;
    height: 20px;
`

const BrandDealCarouselContentDiscount = styled.span<DiscountType>`
    margin-right: ${({type}) => type === 'RATE' ? '4px' : '0px'};
    color: ${({type, theme}) => type === 'RATE' ? theme.Color.Primary500 : theme.Color.black};
    font-weight: bold;
`