import { Button, createTheme, ThemeProvider } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { osmosis } from 'osmojs'
import * as utils from './utils/theme'
import { Link, useNavigate } from 'react-router-dom'
//import logo from '../../assets/img/logo.svg';
//import Greetings from '../../containers/Greetings/Greetings';
//import './Popup.css'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #f1f2f4;
`
//background-color: #f1f2f4;
const LogoWrapper = styled.div`
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`

const SelectWrapper = styled.div`
    height: 20%;
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    align-items: center;
`

/* const Button = styled.div`
    cursor: pointer;
    font-weight: bold;
    width: 70%;
    height: 35%;
    font-size: 14px;
    border-radius: 5px;
    background-color: #6eb5aa;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
` */
const StyledButton = styled(Button)`
    backgroundcolor: ${utils.bgColor};
    font-weight: bold;
    width: 75%;
`
/* const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));
 */
const Popup = () => {
    const navi = useNavigate()
    const { createRPCQueryClient } = osmosis.ClientFactory
    const test = async () => {
        const client = await createRPCQueryClient({
            rpcEndpoint: 'https://osmosis-mainnet-rpc.allthatnode.com:26657/',
        })
        const balance = await client.cosmos.bank.v1beta1.allBalances({
            address: 'osmo1fhfndhdr5l74f9zjep35akrsj3fd6s462sv2ef',
        })
    }
    test()

    return (
        <ThemeProvider theme={utils.theme}>
            <Wrapper className="App">
                <LogoWrapper>logo</LogoWrapper>
                <SelectWrapper>
                    <StyledButton
                        onClick={() => navi('/create')}
                        color="secondary"
                        variant="contained"
                        disableElevation
                    >
                        Create wallet
                    </StyledButton>
                    <StyledButton
        onClick={() => navi("/import")}
                        color="secondary"
                        variant="contained"
                        disableElevation
                    >
                        Import wallet
                    </StyledButton>
                </SelectWrapper>
            </Wrapper>
        </ThemeProvider>
    )
}

export default Popup
