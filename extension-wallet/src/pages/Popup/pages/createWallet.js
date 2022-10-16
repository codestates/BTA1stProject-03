import React, { useState } from 'react'
import { useEffect } from 'react'
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import * as utils from '../utils/theme'
import styled from 'styled-components'
import { Alert, TextField, ThemeProvider } from '@mui/material'
import { StyledButton } from '../components/ui/btn'

const WrapperPopup = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: ${utils.bgColor};
`

const WrapperMnemonic = styled.div`
    width: 70%;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 16px;
`
const MnemonicHeader = styled.div`
    color: ${utils.fontColor};
    font-size: 20px;
    padding: 0 0 5% 0;
`

const WrapperAccount = styled.div`
    width: 70%;
    height: 30%;
`
const AccountHeader = styled.div`
    color: ${utils.fontColor};
    font-size: 16px;
`
const WrapperAlert = styled(Alert)`
    width: 70%;
`
const AlertUi = styled.div`
    font-size: 13px;
`

export default function CreateWallet() {
    const [mnemonic, setMnemonic] = useState()

    useEffect(() => {
        const createMnemo = async () => {
            const wallet = await DirectSecp256k1HdWallet.generate(18)
            const mne = wallet.mnemonic
            setMnemonic(mne)
        }
        createMnemo()
    }, [])

    return (
        <ThemeProvider theme={utils.theme}>
            <WrapperPopup>
                <WrapperAlert severity="error">
                    <div>Keep the mnemonic words safe</div>
                    <AlertUi>
                        1. if someone else knows the mnemonic word, they can
                        lose their assets
                    </AlertUi>
                    <AlertUi>2. Store in a safe place to reuse reuse</AlertUi>
                </WrapperAlert>

                <WrapperMnemonic>
                    <MnemonicHeader>mnemonic word
                        <StyledButton color="secondary" variant="outlined" sx={{width:'3%', marginLeft: '4%', padding:'1px'}} >copy</StyledButton>
                    </MnemonicHeader>
                    <div style={{ fontSize: '13px' }}>{mnemonic}</div>
                </WrapperMnemonic>
                <WrapperAccount>
                    <AccountHeader>account</AccountHeader>
                    <TextField
                        sx={{ width: '100%' }}
                        id="standard-password-input"
                        label="Account Name"
                        defaultValue=""
                        variant="standard"
                        color="secondary"
                    ></TextField>
                </WrapperAccount>
            <StyledButton color="secondary" variant="contained" >next</StyledButton>
            </WrapperPopup>
        </ThemeProvider>
    )
}
