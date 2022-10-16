import { Box, Button, TextField, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import * as utils from '../utils/theme'
import ThreeInput from '../components/threeInput'
import { StyledButton } from '../components/ui/btn'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'

const Wrapper = styled.div`
    padding: 2%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-color: ${utils.bgColor};
`

const WrapperInput = styled.div`
    height: 90%;
    width: 100%;
    margin: 0 0 0;
    padding: 0 0 3%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${utils.bgColor};
`

const InputHeader = styled.div`
    color: ${utils.fontColor};
    font-size: 22px;
`
const WrapperBox = styled.div`
    width: 90%;
    margin: 1% 2% 0% 0%;
`

// mnemonic seed (18 word)
// account name
export default function ImportWallet() {
    const [mnemonic, , setMnemonic] = useState({})
    const mneIter = [3, 6, 9, 12, 15]
    const navigate = useNavigate()

    return (
        <ThemeProvider theme={utils.theme}>
            <Wrapper>
                <Header />
                <WrapperInput>
                    <InputHeader>Input mnemonic</InputHeader>
                    <WrapperBox>
                        <ThreeInput iter={[1, 2, 3]} />
                        <ThreeInput iter={[4, 5, 6]} />
                        <ThreeInput iter={[7, 8, 9]} />
                        <ThreeInput iter={[10, 11, 12]} />
                        <ThreeInput iter={[13, 14, 15]} />
                        <ThreeInput iter={[16, 17, 18]} />
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                marginTop: '20px',
                            }}
                        >
                            <AccountCircle
                                sx={{
                                    color: 'action.active',
                                    mr: 1,
                                    my: 0.5,
                                }}
                            />

                            <TextField
                                variant="outlined"
                                color="secondary"
                                label="Account name"
                            ></TextField>
                        </Box>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginTop: '20px',
                            }}
                        >
                            <StyledButton color="secondary" variant="contained">
                                next
                            </StyledButton>
                        </div>
                        <Button
                            variant="text"
                            color="secondary"
                            style={{ textAlign: 'left' }}
                            onClick={() => navigate(-1)}
                        >
                            {'<-previos'}
                        </Button>
                    </WrapperBox>
                </WrapperInput>
            </Wrapper>
        </ThemeProvider>
    )
}
