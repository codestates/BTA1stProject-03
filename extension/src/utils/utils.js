import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'

const mnemonic_length = 18
const prefixAddress = 'osmo'

// person without wallet
export const creaetWallet = async () => {
    const wallet = await DirectSecp256k1HdWallet.generate()
    return wallet
}

// @arge mnemonic
// @return osmosis Address
export const getAddress = async ({ mnemonic: mnemonic }) => {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
        prefix: prefixAddress,
    })
    const [address] = await wallet.getAccounts()
    return address
}

export const setToken = async ({})

/*
export const getAddres = async () => {
    const wallet = await DirectSecp256k1HdWallet.generate()
    const mnemonic = wallet.mnemonic
    const address = await utils.getAccount({ mnemonic: mnemonic })
    console.log(address)
}
*/
