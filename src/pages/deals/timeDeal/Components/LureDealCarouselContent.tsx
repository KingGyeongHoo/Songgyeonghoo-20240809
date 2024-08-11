import styled from "styled-components";

import { ContentDataProps } from "./Carousel";

export interface DiscountType {
    type : 'RATE' | 'PRICE'
}

export type Content = {content: ContentDataProps}

export const LureDealCarouselContent = ({content} : Content) => {
    return(
        <LureDealCarouselContentDiv>
            <LureDealCarouselContentImgDiv>
                <img src={content.image} />
            </LureDealCarouselContentImgDiv>
            <LureDealCarouselContentDescDiv>
                <LureDealCarouselContentTitle>{content.title}</LureDealCarouselContentTitle>
                <LureDealCarouselContentDiscountDiv>
                    <LureDealCarouselContentDiscount type={'RATE'}>{content.discountRate}%</LureDealCarouselContentDiscount>
                    <LureDealCarouselContentDiscount type={'PRICE'}>{content.discountedPrice.toLocaleString()}</LureDealCarouselContentDiscount>
                </LureDealCarouselContentDiscountDiv>
            </LureDealCarouselContentDescDiv>
            
        </LureDealCarouselContentDiv>
    )
}

const LureDealCarouselContentDiv = styled.div`
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    justify-content: space-between;
    width: 146px;
    height: 227px;
    border-radius: 12px;
    background-color: ${({theme}) => theme.Color.white};
    font-size: 16px;
    margin: 0 6px;
    overflow: hidden;
`

const LureDealCarouselContentImgDiv = styled.div`
    width: 100%;
    height: 142px;

    img{
        width:100%;
        height: 100%;
    }
`

const LureDealCarouselContentDescDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    height: 76px;
    margin: 0 10px;
`

const LureDealCarouselContentTitle = styled.div`
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 16px;
`
const LureDealCarouselContentDiscountDiv = styled.div`
    display: flex;
    height: 22px;
`

const LureDealCarouselContentDiscount = styled.span<DiscountType>`
    margin-right: ${({type}) => type === 'RATE' ? '4px' : '0px'};
    color: ${({type, theme}) => type === 'RATE' ? theme.Color.Primary500 : theme.Color.black};
    font-weight: bold;
`