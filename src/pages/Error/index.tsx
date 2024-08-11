import styled from "styled-components";
import { flexCenter } from "@/styles/GlobalStyle";

export const ErrorComponent = () => {
    return (
        <ErrorComponentContainer>
            <div>
                <img src='https://cdn-icons-png.flaticon.com/512/497/497779.png' />
                <h3>에러가 발생했습니다!</h3>
            </div>
        </ErrorComponentContainer>
    )
}

const ErrorComponentContainer = styled.div`
    ${flexCenter}
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({theme}) => theme.Color.white};
    z-index: 100;

    div{
        ${flexCenter}
        flex-direction: column;
        width: 50%;
        height: fit-content;

        img{
            width: 50%;
            margin-bottom: 10px;
        }

        h3{
            color: ${({theme}) => theme.Color.black};
        }
    }
`