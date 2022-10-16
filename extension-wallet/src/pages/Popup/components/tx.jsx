import React from 'react'

import {
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Avatar,
    ListItemAvatar,
} from '@mui/material'
import styled from 'styled-components'
import * as theme from '../utils/theme'

const Wrapper = styled.div`
    font-color: ${theme.fontColor};
`

export default function Tx({ tx }) {
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
                {tx
                    ? tx.map((v, i) => {
                          return (
                              <ListItem
                                  disablePadding
                                  sx={{ overflow: 'none' }}
                                  key={i}
                              >
                                  <ListItemButton>
                                      <ListItemAvatar>
                                          <Avatar>{'C'}</Avatar>
                                      </ListItemAvatar>
                                      <ListItemText
                                          primary={v[0]}
                                          secondary={v[1]}
                                      />
                                  </ListItemButton>
                              </ListItem>
                          )
                      })
                    : null}
            </List>
        </Wrapper>
    )
}
