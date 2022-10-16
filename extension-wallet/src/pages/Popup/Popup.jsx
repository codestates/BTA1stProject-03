import { Button, createTheme, ThemeProvider } from '@mui/material'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { osmosis } from 'osmojs'
import * as utils from './utils/theme'
import { Link, useNavigate } from 'react-router-dom'
import { utils as wallet } from './utils/wallet'
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
    font-weight: 600;
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

const LogoItem = styled.div`
    background-image: linear-gradient(315deg, #4dccc6 0%, #96e4df 74%);
    width: 35%;
    height: 45%;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 38px;
    margin: 0 0 10% 0;
    border-radius: 10px;
    font-weight: 600;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
        7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
`

/*
 * 1. 출력 형식
 * 2. staking
 * 3. ibc
 * 4.
 */
/*
* 니모닉 코드, 비밀번호 
AES256 암호화, 
*/

const Popup = () => {
    const navi = useNavigate()
    //const { createRPCQueryClient } = osmosis.ClientFactory
    /*     const test = async () => {
        const client = await createRPCQueryClient({
            rpcEndpoint: 'https://osmosis-mainnet-rpc.allthatnode.com:26657/',
        })
        const balance = await client.cosmos.bank.v1beta1.allBalances({
            address: 'osmo1fhfndhdr5l74f9zjep35akrsj3fd6s462sv2ef',
        })
        //chrome.storage.local.set(['test'], 'test')
    } */
    //test()
    //const mainNet = 'https://osmosis-mainnet-rpc.allthatnode.com:26657'

    /*     const getBal = async () => {
        console.log('Test')

        let mnemonic = await wallet.getMnemonic()
        let chain = wallet.getChain('osmosis')
        let signer = await wallet.getSigner(mnemonic, chain)
        let address = await wallet.getAddress(signer)
        let balance = await wallet.getBalance(address, mainNet)
        console.log(balance) */

    /*     chrome.storage.local.set({val: '1234'}, function() {
        console.log('set')
    })

    chrome.storage.local.get(['val'], function(item) {
        console.log(item)
    }) */

    /*         chrome.storage.local.get(["test"], function(items) {
            console.log(items)
        }) */
    //}
    const test = true
    if (test) {
        let mnemonic =
            'heart stairs unique gown risk analyst lyrics setup wall erupt basket apple'
        chrome.storage.local.set({ mnemonic: mnemonic })
        chrome.storage.local.set({ name: 'test!!!' })
    }
    return (
        <ThemeProvider theme={utils.theme}>
            <Wrapper className="App">
                <LogoWrapper>
                    <LogoItem>N</LogoItem>
                </LogoWrapper>
                <SelectWrapper>
                    <StyledButton
                        onClick={() => navi('/create')}
                        color="secondary"
                        variant="contained"
                        sx={{ fontWeight: 600 }}
                    >
                        Create wallet
                    </StyledButton>
                    <StyledButton
                        onClick={() => navi('/import')}
                        color="secondary"
                        variant="contained"
                        sx={{ fontWeight: 600 }}
                    >
                        Import wallet
                    </StyledButton>
                    <StyledButton
                        onClick={() => navi('/user')}
                        color="secondary"
                        variant="contained"
                        sx={{ fontWeight: 600 }}
                    >
                        wallet
                    </StyledButton>
                </SelectWrapper>
            </Wrapper>
        </ThemeProvider>
    )
}

export default Popup
