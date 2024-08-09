import styled from "styled-components"
import { flexCenter } from "@/styles/GlobalStyle"
import { useEffect, useState } from "react";
import axios from "axios";

interface TimeDealTabProps {
    hour: number;
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

const TimeDealTab: React.FC<TimeDealTabProps> = ({hour}) => {
    const [idx, setIdx] = useState(0)

    const getHour = (hour:number) => {
        if(hour > 12){
            return `오후 ${hour - 12}`
        } else {
            return `오전 ${hour}`
        }
    }

    return (
        <TimeDealTabContainer>
            <TimeDealTabDiv onClick={() => setIdx(0)}>
                <TimeDealTabTextDiv selected={idx === 0}>{getHour(hour)}시</TimeDealTabTextDiv>
            </TimeDealTabDiv>
            <TimeDealTabDiv onClick={() => setIdx(1)}>
                <TimeDealTabTextDiv selected={idx === 1}>{getHour(hour+1)}시</TimeDealTabTextDiv>
            </TimeDealTabDiv>
        </TimeDealTabContainer>
    )
    
}

export const TimeDealSection = () => {
    const [timeDealData, setTimeDealData] = useState([])
    const hour = new Date().getHours()

    useEffect(() => {
        const getTimeDealData = async () => {
          try {
            const response = await axios.get('https://assignment-front.ilevit.com/deals/time-deal?time=current&page=1');
            setTimeDealData(response.data.itemList);
          } catch (err) {
            console.log('Error')
          }
        };
    
        getTimeDealData();
      }, []);
      
    return(
        <TimeDealContainer>
            {hour >= 7 && hour <= 23 ? <TimeDealTab hour={hour}/> : <TimeDealWaitFor7 />}
        </TimeDealContainer>
    )
}

const TimeDealContainer = styled.div`
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
    width: 63px;
    height: 100%;
    border-bottom: ${({selected}) => selected && '2px solid black'};
    font-weight: bold;
`