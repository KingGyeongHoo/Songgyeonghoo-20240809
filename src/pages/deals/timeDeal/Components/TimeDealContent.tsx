import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useRecoilState } from "recoil";
import { timeDealQueryPage } from "@/recoil/timeDealQueryPage";

import { ContentDataProps } from "./Carousel";
import { useEffect } from "react";

interface Content {
    content: ContentDataProps
    showPage: string
    lastItem: number
}

export interface DiscountType {
    type : 'RATE' | 'PRICE'
}

export const TimeDealContent = ({content, showPage, lastItem } : Content) => {
    const [queryPage, setQueryPage] = useRecoilState(timeDealQueryPage)
    const isLastItem = content.id === lastItem

    const { ref, inView } = useInView({
        threshold: 0,
      })
    
      useEffect(() => {
        if (inView && isLastItem) {
            setQueryPage(prev => prev + 1)
        }
      }, [inView]);
    
    return(
        <TimeDealContentDiv ref={ref}>
            <TimeDealContentImgDiv>
                {showPage === 'next' && (
                    <TimeDealContentImgNotOpen>
                        <span>오픈 예정</span>
                    </TimeDealContentImgNotOpen>
                )}
                <TimeDealContentImg src={content.image} />
            </TimeDealContentImgDiv>
            <TimeDealContentDescDiv>
                <TimeDealContentTitleDiv>
                    <TimeDealContentTitle>{content.title}</TimeDealContentTitle>
                    <TimeDealOriginPrice>{content.originalPrice?.toLocaleString()}원</TimeDealOriginPrice>
                </TimeDealContentTitleDiv>
                <TimeDealContentDiscountDiv>
                    <TimeDealContentDiscount type={'RATE'}>{content.discountRate}%</TimeDealContentDiscount>
                    <TimeDealContentDiscount type={'PRICE'}>{content.discountedPrice?.toLocaleString()}원</TimeDealContentDiscount>
                </TimeDealContentDiscountDiv>
            </TimeDealContentDescDiv>
        </TimeDealContentDiv>
    )
}

const TimeDealContentDiv = styled.div`
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    justify-content: space-between;
    width: calc(50% - 16px);
    height: 277px;
    background-color: ${({theme}) => theme.Color.white};
    font-size: 16px;
    margin: 0 4px 12px 4px;
    overflow: hidden;
`

const TimeDealContentImgDiv = styled.div`
    position: relative;
    width: 100%;
    height: 175px;
    border-radius: 10px;
    overflow: hidden;
`

const TimeDealContentImg = styled.img`
    width:100%;
    height: 100%;
`

const TimeDealContentImgNotOpen = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);

    span{
        color: ${({theme}) => theme.Color.white};
        font-weight: bold;
    }
`

const TimeDealContentDescDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    height: 92px;
    margin: 0 10px;
`

const TimeDealContentTitleDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    height: 66px;
`

const TimeDealContentTitle = styled.div`
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 16px;
`

const TimeDealOriginPrice = styled.span`
    color: ${({theme}) => theme.Color.Gray300};
    text-decoration: line-through;
`

const TimeDealContentDiscountDiv = styled.div`
    display: flex;
    width: 100%;
    height: 22px;
`

const TimeDealContentDiscount = styled.span<DiscountType>`
    margin-right: ${({type}) => type === 'RATE' ? '4px' : '0px'};
    color: ${({type, theme}) => type === 'RATE' ? theme.Color.Primary500 : theme.Color.black};
    font-weight: bold;
`