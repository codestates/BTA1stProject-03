import React, { useState } from 'react'
import { useEffect } from 'react'
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'

export default function CreateWallet() {
    const [mnemonic, setMnemonic] = useState()


    useEffect(() => {
        const createMnemo = async () => {
            const wallet = await DirectSecp256k1HdWallet.generate(18)
            const mne = wallet.mnemonic
            setMnemonic(mne)
        }
        createMnemo()
    },[])
   
    return <div>
        {mnemonic}
        </div>
}
