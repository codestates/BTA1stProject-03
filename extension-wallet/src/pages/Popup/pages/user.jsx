import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as theme from '../utils/theme'
import Header from '../components/header'
import * as wallet from '../utils/wallet'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import url from '../config/config.json'
import { PieChart } from 'react-minimal-pie-chart'
import { Box, ThemeProvider, Tab, Backdrop } from '@mui/material'
import { TabContext, TabPanel, TabList } from '@mui/lab'
import Tokens from '../components/Tokens'
import { useNavigate, useNavigation } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Tx from '../components/tx'

const reset = () => {
    chrome.storage.local.set({ mnemonic: '' }, function () {
        console.log('Set')
    })
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${theme.bgColor};
`

const WrapHeader = styled.div`
    height: 13%;
`
const WrapperBody = styled.div`
    height: 55%;
    width: 100%;
    padding: 2%;
    border-radius: 10px;
    background-color: #ffffff;
`

const WrapperTransaction = styled.div`
    height: 25%;
`
const AccountHeader = styled.div`
    height: 27%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    margin: 0 0 10px 0;
    color: ${theme.fontColor};
`
const Asset = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 40%;
`
const WrapperUserButton = styled.div`
    height: 20%;
`

export default function User() {
    const [mnemonic, setMnemonic] = useState()
    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [asset, setAsset] = useState()
    const [tabValue, setTabValue] = useState('1')
    const [loading, setLoading] = useState(true)
    const chainName = 'osmosis'
    const navi = useNavigate()
    const navigation = useNavigation()
    const [tx, setTx] = useState('')

    const handleChange = (event, newValue) => {
        setTabValue(newValue)
    }
    useEffect(() => {
        const getAddr = async (mne) => {
            const endPoint = 'https://osmosis-mainnet-rpc.allthatnode.com:26657'
            const chain = wallet.utils.getChain(chainName)
            const signer = await wallet.utils.getSigner(mne, chain)
            const addr = await wallet.utils.getAddress(signer)
            const ass = await wallet.utils.getBalance(addr, endPoint)
            const signingClient = await wallet.utils.getSigningClient(
                endPoint,
                signer
            )
            const getTx = await wallet.utils.getTx(addr, signingClient)
            setAddress(addr)
            setAsset(ass)
            setTx(getTx)
            console.log(getTx)
            setLoading(false)
        }
        chrome.storage.local.get('mnemonic', function (item) {
            setMnemonic(item.mnemonic)
            getAddr(item.mnemonic)
        })
        chrome.storage.local.get('name', function (item) {
            setName(item.name)
        })
    }, [])

    return (
        <ThemeProvider theme={theme.theme}>
            <Wrapper>
                <Backdrop
                    sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <WrapHeader>
                    <Header refresh={true}/>
                </WrapHeader>
                <WrapperBody>
                    <AccountHeader>
                        <div style={{ padding: '1%' }}>{name}</div>
                        <Tooltip title={address}>
                            <Button variant="outlined" color="secondary">
                                {address
                                    ? address.slice(0, 10) +
                                      '...' +
                                      address.slice(37, -1)
                                    : null}
                            </Button>
                        </Tooltip>
                    </AccountHeader>
                    <Asset>
                        <div
                            style={{
                                padding: '5%',
                                width: '30%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <PieChart
                                data={[
                                    {
                                        title: 'One',
                                        value: 10,
                                        color: '#E38627',
                                    },
                                    {
                                        title: 'Two',
                                        value: 15,
                                        color: '#C13C37',
                                    },
                                ]}
                            />
                        </div>
                        {asset
                            ? asset?.balances?.map((v, i) => {
                                  console.log(asset.balance)
                                  if (v.denom === 'uosmo') {
                                      return (
                                          <div
                                              key={i}
                                              style={{
                                                  display: 'flex',
                                                  justifyContent: 'center',
                                              }}
                                          >
                                              <div style={{ fontSize: '18px' }}>
                                                  - Available{' '}
                                                  {(v.amount / 1000000)
                                                      .toString()
                                                      .slice(0, 5)}
                                              </div>
                                              <div
                                                  style={{
                                                      fontSize: '18px',
                                                      marginLeft: '5px',
                                                  }}
                                              >
                                                  osmo
                                              </div>
                                          </div>
                                      )
                                  }
                              })
                            : null}
                        <WrapperUserButton>
                            <Button
                                color="secondary"
                                onClick={() => navi('/send')}
                            >
                                Send
                            </Button>
                            <Button color="secondary">Staking</Button>
                        </WrapperUserButton>
                    </Asset>
                </WrapperBody>
                <WrapperTransaction>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={tabValue}>
                            <Box
                                sx={{ borderBottom: 1, borderColor: 'divider' }}
                                color="secondary"
                            >
                                <TabList
                                    onChange={handleChange}
                                    aria-label="lab API tabs example"
                                    color="secondary"
                                    textColor="secondary"
                                    indicatorColor="secondary"
                                >
                                    <Tab
                                        label="Token"
                                        value="1"
                                        color="secondary"
                                    />
                                    <Tab
                                        label="Transaction"
                                        value="2"
                                        color="secondary"
                                    />
                                </TabList>
                            </Box>

                            <TabPanel value="1">
                                <Tokens assets={asset} />
                            </TabPanel>
                            <TabPanel value="2" color="secondary" sx={{overflow:'none'}} >
                                <Tx tx={tx}></Tx>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </WrapperTransaction>
            </Wrapper>
        </ThemeProvider>
    )
}
