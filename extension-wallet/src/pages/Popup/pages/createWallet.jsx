import React, { useState } from 'react'
import { useEffect } from 'react'
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import * as utils from '../utils/theme'
import { clipboardCopy } from '../utils/copy'
import styled from 'styled-components'
import { Alert, Button, TextField, ThemeProvider } from '@mui/material'
import { StyledButton } from '../components/ui/btn'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'
import * as wallet from '../utils/wallet'
import { useDispatch } from 'react-redux'

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
    width: 80%;
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 16px;
`
const MnemonicHeader = styled.div`
    color: ${utils.fontColor};
    font-size: 20px;
    padding: 0 0 3% 0;
`

const WrapperAccount = styled.div`
    width: 80%;
    height: 20%;
`
const AccountHeader = styled.div`
    color: ${utils.fontColor};
    font-size: 16px;
`
const WrapperAlert = styled(Alert)`
    width: 80%;
    padding: 5% 0 0 0;
`
const AlertUi = styled.div`
    font-size: 13px;
`

export default function CreateWallet() {
    const [mnemonic, setMnemonic] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [pw, setPw] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const createMnemo = async () => {
            const wallet = await DirectSecp256k1HdWallet.generate(18)
            const mne = wallet.mnemonic
            setMnemonic(mne)
        }
        createMnemo()
    }, [])
    const next = () => {
        if (!mnemonic) {
            return
        }
        console.log(name, pw)

        if (!name || !pw) {
            setError(true)
            return
        }
        let auth = wallet.utils.aes256Encrypt(mnemonic, pw)
        let encryptPassword = wallet.utils.md5Encrypt(pw)
        chrome.storage.local.set({ name: name })
        chrome.storage.local.set({ encryptPassword: encryptPassword })
        chrome.storage.local.set({ auth: auth })
        chrome.storage.local.set({mnemonic: mnemonic})
        navigate('/user')
    }
    const pwHandler = (e) => {
        console.log(e.target.value)
        setPw(e.target.value)
    }

    const accountHandler = (e) => {
        setName(e.target.value)
        setError(false)
    }

    return (
        <ThemeProvider theme={utils.theme}>
            <WrapperPopup>
                <div style={{ height: '15%', width: '100%' }}>
                    <Header>W</Header>
                </div>
                <WrapperAlert severity="error">
                    <div>Keep the mnemonic words safe</div>
                    <AlertUi>
                        1. if someone else knows the mnemonic word, they can
                        lose their assets
                    </AlertUi>
                    <AlertUi>2. Store in a safe place to reuse reuse</AlertUi>
                </WrapperAlert>
                <WrapperMnemonic>
                    <MnemonicHeader>
                        mnemonic word
                        <StyledButton
                            color="secondary"
                            variant="outlined"
                            sx={{
                                width: '3%',
                                marginLeft: '4%',
                                padding: '1px',
                            }}
                            onClick={() => clipboardCopy({ text: mnemonic })}
                        >
                            copy
                        </StyledButton>
                    </MnemonicHeader>
                    <div style={{ fontSize: '13px' }}>{mnemonic}</div>
                </WrapperMnemonic>
                <WrapperAccount>
                    <TextField
                        error={error}
                        sx={{ width: '100%' }}
                        id="standard-password-input"
                        label="Account Name"
                        defaultValue=""
                        variant="standard"
                        color="secondary"
                        onChange={accountHandler}
                        helperText={error ? 'input account name' : null}
                    ></TextField>
                    <TextField
                        error={error}
                        type="password"
                        sx={{ width: '100%' }}
                        id="standard-password-input"
                        label="Password"
                        defaultValue=""
                        variant="standard"
                        color="secondary"
                        onChange={pwHandler}
                        helperText={error ? 'input account name' : null}
                    ></TextField>
                </WrapperAccount>
                <StyledButton
                    onClick={() => next()}
                    color="secondary"
                    variant="contained"
                >
                    next
                </StyledButton>
                <div style={{ width: '80%' }}>
                    <Button
                        variant="text"
                        color="secondary"
                        style={{ textAlign: 'left' }}
        onClick={() => navigate(-1)}
                    >
                        {'<-previos'}
                    </Button>
                </div>
            </WrapperPopup>
        </ThemeProvider>
    )
}
