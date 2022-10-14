import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import React from 'react'
import * as utils from '../utils/utils'

// 지갑 생성
//

export default function Root() {
    const tmp = 'osmo1jzqn0darr5p9c9qnhgg5zt7ffj0w8xfkj8tm00'

    //const test = async () => await utils.getAddress({ mnemonic: mnemonic })

    const test = async () => {
        //const wallet = await DirectSecp256k1HdWallet.generate()
        //const mnemonic = wallet.mnemonic

        // Address 1 get Account
        const mnemonic =
            'swarm damage beef debris final tunnel winter inquiry dash edge elder document'
        const addressData = await utils.getAddress({ mnemonic: mnemonic })
    }
    test()

    return <div>helo</div>
}
