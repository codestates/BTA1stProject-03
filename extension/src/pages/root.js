import { osmosis } from 'osmojs'
import {
    assertIsBroadcastTxSuccess,
    SigningStargateClient,
    StargateClient,
} from '@cosmjs/stargate'

import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import React from 'react'

export default function Root() {
    const mnemonic =
        'surround miss nominee dream gap cross assault thank captain prosper drop duty group candy wealth weather scale put'

    const test = async () => {
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic)
        console.log(wallet)
    }
    test()
    return <div>helo</div>
}
