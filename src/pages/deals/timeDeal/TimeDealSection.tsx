import styled from "styled-components"
import { flexCenter } from "@/styles/GlobalStyle"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";

import { ContentDataProps } from "./Components/Carousel";
import { TimeDealContent } from "./Components/TimeDealContent";
import { timeDealQueryPage } from "@/recoil/timeDealQueryPage";
import { error } from "@/recoil/error";


interface TimeDealTabProps {
    hour: number;
    showPage: string;
    setShowPage: (showPage:string) => void;
}

interface TabSelectProps {
    selected: boolean;
}

const TimeDealWaitFor7 = () => {
    return(
        <TimeDealTitleContainer>
            <TimeDealTitle>7시에 시작되는 오늘의 타임특가!</TimeDealTitle>
        </TimeDealTitleContainer>
    )
}

const TimeDealTab: React.FC<TimeDealTabProps> = ({hour, showPage,setShowPage}) => {
    const [queryPage, setQueryPage] = useRecoilState(timeDealQueryPage)


    const getHour = (hour:number) => {
        if(hour > 12){
            return `오후 ${hour - 12}`
        } else {
            return `오전 ${hour}`
        }
    }

    if(hour === 22){
        return (
            <TimeDealTitleContainer>
                <TimeDealTitle>11시에 끝나는 오늘의 마지막 타임특가!</TimeDealTitle>
            </TimeDealTitleContainer>
        )
    }

    const clickTab = (type: string) => {
        setShowPage(type)
        setQueryPage(1)
    }
    return (
        <TimeDealTabContainer>
            <TimeDealTabDiv onClick={() => clickTab('current')}>
                <TimeDealTabTextDiv selected={showPage === 'current'}>{getHour(hour)}시</TimeDealTabTextDiv>
            </TimeDealTabDiv>
            <TimeDealTabDiv onClick={() => clickTab('next')}>
                <TimeDealTabTextDiv selected={showPage === 'next'}>{getHour(hour+1)}시</TimeDealTabTextDiv>
            </TimeDealTabDiv>
        </TimeDealTabContainer>
    )
    
}

export const TimeDealSection = () => {
    const hour = new Date().getHours()
    const [showPage, setShowPage] = useState(hour >= 7 && hour <= 23 ? 'current' : 'next')
    const [timeDealData, setTimeDealData] = useState<ContentDataProps[]>([])
    const [isLastPage, setIsLastPage] = useState(false)
    const [isError, setIsError] = useRecoilState(error)
    const queryPage = useRecoilValue(timeDealQueryPage)

    useEffect(() => {
        const getTimeDealData = async () => {
            try {
                const response = await axios.get(`https://assignment-front.ilevit.com/deals/time-deal?time=${showPage}&page=${queryPage}`);
                const newData = response.data.itemList
                const isLastPage = response.data.isLastPage
    
                if (timeDealData.length === 0 || queryPage === 1) {
                    setTimeDealData(newData);
                  } else {
                    setTimeDealData(prevData => [...prevData, ...newData]);
                  }

                if(isLastPage) {
                    setIsLastPage(true)
                }
            } catch (err) {
              console.log('Error');
              setIsError('time')
            }
          };
        if(!isLastPage) getTimeDealData();
    }, [showPage, queryPage])

    return(
        <TimeDealContainer>
            {hour >= 7 && hour <= 23 ? 
                <TimeDealTab
                    hour={hour}
                    showPage={showPage}
                    setShowPage={setShowPage}
                /> : 
                <TimeDealWaitFor7 />}
            <TimeDealContentContainer>
                {timeDealData.map((content:ContentDataProps, idx:number) => 
                    <TimeDealContent
                        key={idx}
                        content={content} 
                        showPage={showPage}
                        lastItem={timeDealData.length}
                    />
                )}
            </TimeDealContentContainer>
        </TimeDealContainer>
    )
}

const TimeDealContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: ${({theme}) => theme.Color.white};
`

const TimeDealTitleContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 57px;
    padding: 0 16px;
    margin-bottom: 10px;
`

const TimeDealTitle = styled.h1`
    font-size: 18px;
    font-weight: bold;
    color: ${({theme}) => theme.Color.black};
`

const TimeDealTabContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 39px;
    margin-bottom: 10px;
`
const TimeDealTabDiv = styled.div`
    ${flexCenter};
    width: 50%;
    height: 100%;
`

const TimeDealTabTextDiv = styled.div<TabSelectProps>`
    ${flexCenter};
    width: fit-content;
    height: 100%;
    border-bottom: ${({selected}) => selected && '2px solid black'};
    font-weight: bold;
`

const TimeDealContentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: fit-content;
    padding: 0px 12px;
`