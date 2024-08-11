import { Header } from "@/components";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";

import { BrandDealContent } from "./Components/BrandDealContent";
import { ContentDataProps } from "../timeDeal/Components/Carousel";
import { brandDealQueryPage } from "@/recoil/brandDealQueryPage";
import { error } from "@/recoil/error";
import { ErrorComponent } from "@/pages/Error";

const BrandDeal = () => {
  const [brandDealData, setBrandDealData] = useState<ContentDataProps[]>([])
  const [isLastPage, setIsLastPage] = useState(false)
  const [isError, setIsError] = useRecoilState(error)
  const queryPage = useRecoilValue(brandDealQueryPage)
    useEffect(() => {

        const getBrandDealData = async () => {
          try {
            const response = await axios.get(`https://assignment-front.ilevit.com/deals/brand-deal?page=${queryPage}`);
            const newData = response.data.itemList
            const isLastPage = response.data.isLastPage

            if (brandDealData.length === 0) {
              setBrandDealData(newData);
            } else {
              setBrandDealData(prevData => [...prevData, ...newData]);
            }

            if(isLastPage) {
              setIsLastPage(true)
            }
          } catch (err) {
            console.log('Error')
            setIsError('brandMain')
          }
        };
    
        if(!isLastPage) getBrandDealData();
      }, [queryPage]);

  if(isError === 'brandMain'){
    return <ErrorComponent />
  }
  return (
    <div>
      <Header title="오늘의 브랜드딜" isBackButtonVisible={true} />
      <main>
        <BrandDealContainer>
          <BrandDealContentContainer>
              {brandDealData.map((content: ContentDataProps, idx: number) => 
                <BrandDealContent
                  content={content}
                  isLastItem={idx === brandDealData.length - 1}
                ></BrandDealContent>
              )}
          </BrandDealContentContainer>
        </BrandDealContainer>
      </main>
    </div>
  );
};

const BrandDealContainer = styled.div`
  width: 100%;
`

const BrandDealContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  padding: 5px 16px;
`

export default BrandDeal;
