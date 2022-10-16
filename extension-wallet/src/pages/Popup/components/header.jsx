import React from 'react'
import styled from 'styled-components';
import * as theme from '../utils/theme'

const LogoItem = styled.div`
    background-image: linear-gradient(315deg, #4dccc6 0%, #96e4df 74%);
    width: 17%;
    height: 70%;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    margin: 0 0 0 0;
    border-radius: 10px;
    font-weight: 600;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
        7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
`

const LogoWrapper = styled.div`
padding: 0% 0 0 5%;
height: 100%;
wdiht: 100%;
display: flex;
align-items: center;
justify-content: left;
background-color: ${theme.bgColor} 
`
const LogoText = styled.div`
font-size: 18px;
margin: 0 0 0 3%;
display: flex;
align-items: center;
color: black;

`
export default function Header() {
    return (
        <LogoWrapper>
            <LogoItem>N</LogoItem>
            <LogoText>
                NUGUNA
            </LogoText>
        </LogoWrapper>
    )
}
