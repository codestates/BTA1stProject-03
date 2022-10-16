import {
    Button,
    ButtonGroup,
    InputAdornment,
    TextField,
    ThemeProvider,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as theme from '../utils/theme'
import { Form, useNavigate } from 'react-router-dom'
import AccountCircle from '@mui/icons-material/AccountCircle'
import * as wallet from '../utils/wallet'
import { coin } from '@cosmjs/amino'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Header = styled.div`
    display: flex;
    height: 10%;
    width: 100%;
`

const HeaderMainNet = styled.div`
    margin: 0 0 0 10%;
    font-size: 24px;
    display: flex;
    align-items: center;
    height: 100%;
    color: ${theme.fontColor};
`

const SendBody = styled.div`
    margin: 15px 0 0;
    width: 90%;
    height: 90%;
`
const WrapperForm = styled(Form)`
    font-color: ${theme.fontColor};
`

export default function Send() {
    const [mnemonic, setMnemonic] = useState('')
    const [values, setValues] = useState({
        resipient: '',
        amount: '',
        feeAmount: '',
        fee: '',
    })
    const [error, setError] = useState(true)
    const [feeSelect, setFeeSelect] = useState('min')
    const [address, setAddress] = useState('')
    const [asset, setAsset] = useState(0)
    const navi = useNavigate()
    const chainName = 'osmosis'
    const chain = wallet.utils.getChain(chainName)
    const amountHandler = (e) => {
        let amount = e.target.value
        if (!amount) {
            return
        }
        amount = parseInt(amount * 1000000)
        setValues({ ...values, amount: coin(amount, 'uosmo').amount })
    }
    const recipientHandler = (e) => {
        console.log(e.target.value)
        setValues({ ...values, resipient: e.target.value })
    }
    const getFee = ({ type }) => {
        const feeAmount = wallet.utils.getFee(type)
        console.log(feeAmount)
        setFeeSelect(type)
        setValues({
            ...values,
            feeAmount: feeAmount.amount[0].amount,
            fee: feeAmount,
        })
    }

    const send = async () => {
        if (!values.resipient || !values.amount || !values.fee || !address) {
            console.log(values, 'error', address)
            setError(true)
            return
        }
        const signer = await wallet.utils.getSigner(mnemonic, chain)
        const signClinet = await wallet.utils.getSigningClient(
            'https://osmosis-mainnet-rpc.allthatnode.com:26657',
            signer
        )
        console.log(values, 'Eeee')
        const test = await wallet.utils.sendOsmosis(
            address,
            values.resipient,
            values.amount,
            values.fee,
            signClinet
        )
        console.log(test)
        setError(false)
    }

    useEffect(() => {
        const getAddr = async (mne) => {
            const chain = wallet.utils.getChain(chainName)
            const signer = await wallet.utils.getSigner(mne, chain)
            const addr = await wallet.utils.getAddress(signer)
            const ass = await wallet.utils.getBalance(
                addr,
                'https://osmosis-mainnet-rpc.allthatnode.com:26657'
            )
            console.log(ass, addr)
            setAddress(addr)
            ass?.balances.map((v) => {
                if (v.denom === 'uosmo') {
                    setAsset(v.amount / 1000000)
                }
            })
        }
        chrome.storage.local.get(['mnemonic'], function (item) {
            setMnemonic(item.mnemonic)
            getAddr(item.mnemonic)
        })
        getFee({ type: 'low' })
    }, [])
    return (
        <ThemeProvider theme={theme.theme}>
            <Wrapper>
                <Header>
                    <Button
                        variant="text"
                        color="secondary"
                        onClick={() => navi(-1)}
                    >
                        {'<- pre  '}
                    </Button>
                    <HeaderMainNet>OSMOSIS</HeaderMainNet>
                </Header>
                <SendBody>
                    <WrapperForm method="post">
                        <TextField
                            required
                            error={error}
                            label="Recipient"
                            sx={{ marginBottom: '30px', width: '100%' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            onChange={recipientHandler}
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            label="Token"
                            id="outlined-disabled"
                            defaultValue="OSMOSIS"
                            sx={{ marginBottom: '20px' }}
                            variant="filled"
                            onChange={recipientHandler}
                        />
                        <TextField
                            required
                            label="Amount"
                            error={error}
                            sx={{ marginBottom: '20px' }}
                            variant="outlined"
                            onChange={amountHandler}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        uosmo
                                    </InputAdornment>
                                ),
                            }}
                            helperText={'amount < ' + asset}
                        />
                        <ButtonGroup
                            variant="contained"
                            size="small"
                            aria-label="outlined primary button group"
                            color="secondary"
                        >
                            <Button onClick={() => getFee({ type: 'low' })}>
                                min
                            </Button>
                            <Button onClick={() => getFee({ type: 'medium' })}>
                                average
                            </Button>
                            <Button onClick={() => getFee({ type: 'high' })}>
                                high
                            </Button>
                        </ButtonGroup>
                        <TextField
                            disabled
                            label="Fee"
                            sx={{ marginTop: '20px', marginBottom: '20px' }}
                            variant="outlined"
                            defaultValue=""
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {feeSelect +
                                            '- ' +
                                            values.feeAmount +
                                            ' gas'}
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            color="secondary"
                            variant="contained"
                            sx={{ width: '100%', fontWeight: 900 }}
                            onClick={() => send()}
                        >
                            send
                        </Button>
                    </WrapperForm>
                </SendBody>
            </Wrapper>
        </ThemeProvider>
    )
}
