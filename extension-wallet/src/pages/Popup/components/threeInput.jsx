import styled from 'styled-components'
import { Box, TextField } from '@mui/material'
import React from 'react'
import * as theme from '../utils/theme'

const Wrapper = styled.div`
    display: flex;
    margin: 0% 0 0% 0;
`

const StyledTextField = styled(TextField)``
export default function ThreeInput({ iter }) {
    return (
        <Wrapper>
            {iter.map((v, i) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <StyledTextField
                            sx={{ marginLeft: '5px' }}
                            Key={v + ' word'}
                            label={v + '. word'}
                            variant="standard"
                            color="secondary"
                        />
                    </Box>
                )
            })}
        </Wrapper>
    )
}
