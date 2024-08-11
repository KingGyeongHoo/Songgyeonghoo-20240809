import styled, {keyframes} from "styled-components";
import { useInView } from "react-intersection-observer";
import { useRecoilState } from "recoil";
import { brandDealQueryPage } from "@/recoil/brandDealQueryPage";

import { ContentDataProps } from "../../timeDeal/Components/Carousel";
import { useEffect, useState } from "react";

interface Content {
    content: ContentDataProps
    isLastItem:boolean
}

interface ProgressBarProps {
    percentage: number
    isView: boolean
}

const fillAnimation = (percentage: number) => keyframes`
    0% {
        width: 0;
    }
    100% {
        width: ${percentage}%;
    }
`;

export const BrandDealContent = ({content, isLastItem}: Content) => {
    const [isView, setIsView] = useState(false)
    const [queryPage, setQueryPage] = useRecoilState(brandDealQueryPage)

    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true,
      })

    useEffect(() => {
    if(inView){
        setIsView(true)
    }
    if (inView && isLastItem) {
        setQueryPage(queryPage + 1)
    }
    }, [inView]);
    return(
        <BrandDealContentDiv ref={ref}>
            <BrandDealContentImgDiv>
                <img src={content.image} />
            </BrandDealContentImgDiv>
            <BrandDealContentDescDiv>
                <BrandDealContentTitleDiv>
                    <BrandDealContentTitle>{content.title}</BrandDealContentTitle>
                    <BrandDealContentProgressBar percentage={content.discountRate} isView={isView}>
                        <div />
                        <span>{content.discountRate}%</span>
                    </BrandDealContentProgressBar>
                </BrandDealContentTitleDiv>
                <BrandDealContentDiscountDiv>
                    <h5>할인가 {content.discountedPrice.toLocaleString()}원</h5>
                    <span>곧 정상가 {content.originalPrice.toLocaleString()}원으로 돌아갑니다</span>
                </BrandDealContentDiscountDiv>
            </BrandDealContentDescDiv>
        </BrandDealContentDiv>
    )
}

const BrandDealContentDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 161px;
    font-size: 16px;
`

const BrandDealContentImgDiv = styled.div`
    width: 141px;
    height: 141px;
    border-radius: 8px;
    overflow: hidden;

    img{
        width: 100%;
        height: 100%;
    }
`

const BrandDealContentDescDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 207px;
    height: 141px;
`

const BrandDealContentTitleDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
`

const BrandDealContentTitle = styled.div`
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 16px;
`

const BrandDealContentProgressBar = styled.div<ProgressBarProps>`
    position: relative;
    width: 100%;
    height: 16px;
    background-color: ${({theme}) => theme.Color.Orange300};
    margin-top: 8px;
    border-radius: 20px;
    overflow: hidden;
    
    div{
        position: absolute;
        top: 0;
        left: 0;
        width: ${props => props.percentage}%;
        height: 100%;
        background-color: ${({theme}) => theme.Color.Orange500};
        animation: ${props => props.isView && fillAnimation(props.percentage)} 1s ease-in-out forwards;
    }

    span{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: ${({theme}) => theme.Color.white};
        font-size: 12px;
        font-weight: bold;
    }
`

const BrandDealContentDiscountDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    height: 40px;
    margin-top: 12px;

    h5{
        color: ${({theme}) => theme.Color.Primary500};
        font-size: 16px;
    }

    span{
        color: ${({theme}) => theme.Color.Gray300};
        font-size: 12px;
    }
`
