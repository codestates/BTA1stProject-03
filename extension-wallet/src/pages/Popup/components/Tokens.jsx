import {
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Avatar,
    ListItemAvatar,
} from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import * as theme from '../utils/theme'

const Wrapper = styled.div`
    font-color: ${theme.fontColor};
`

export default function Tokens({ assets }) {
    return (
        <Wrapper>
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    maxHeight: 70,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                }}
            >
                {assets
                    ? assets?.balances?.map((v, i) => {
                          if (v.denom !== 'uosmo') {
                              console.log(v)
                              return (
                                  <ListItem disablePadding key={i}>
                                      <ListItemButton>
                                          <ListItemAvatar>
                                              <Avatar>
                                                  {v.denom.slice(0, 1)}
                                              </Avatar>
                                          </ListItemAvatar>
                                          <ListItemText
                                              primary={
                                                  v.denom.slice(0, 20) +
                                                  ' token'
                                              }
                                              secondary={v.amount}
                                          />
                                      </ListItemButton>
                                  </ListItem>
                              )
                          }
                      })
                    : null}
            </List>
        </Wrapper>
    )
}
