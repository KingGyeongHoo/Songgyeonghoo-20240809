import styled from "styled-components";

import { LureDealCarouselContent } from "./LureDealCarouselContent";
import { BrandDealCarouselContent } from "./BrandDealCarouselContent";

export interface ContentDataProps {
    id: number,
    title: string,
    originalPrice: number,
    discountedPrice: number,
    discountRate: number,
    stockPercentage?: number,
    image: string,
    discountEndDate?:string,
}
interface ContentData {
    dealType: 'LURE' | 'BRAND'
    data: ContentDataProps[]
}

export const Carousel: React.FC<ContentData> = ({data, dealType}) => {
    return (
        <CarouselContentContainer>
            {data.map((content) => dealType === 'LURE' ? 
                <LureDealCarouselContent key={content.id} content={content} /> :
                <BrandDealCarouselContent key={content.id} content={content}  />)}
        </CarouselContentContainer>
    )
}

export const CarouselContentContainer = styled.div`
    display: flex;
    height: 239px;
    padding: 0 10px;
    overflow-x: scroll;

    /* 스크롤바 숨기기 */
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`