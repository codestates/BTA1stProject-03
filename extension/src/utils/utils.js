import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'

/*
 * 모듈화 
 */
const mnemonic_length = 18
const prefixAddress = 'osmo'

// person without wallet
// 처음부터 생성하는 것
export const creaetWallet = async () => {
    const wallet = await DirectSecp256k1HdWallet.generate()
    return wallet
}

// @arge mnemonic
// @return osmosis Address
// 니모닉과 페스워드
export const getAddress = async ({ mnemonic: mnemonic }) => {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
        prefix: prefixAddress,
    })
    const [address] = await wallet.getAccounts()
    return address
}

// https://gist.github.com/webmaster128/8444d42a7eceeda2544c8a59fbd7e1d9
// export const setToken = async({})

/*
export const getAddres = async () => {
    const wallet = await DirectSecp256k1HdWallet.generate()
    const mnemonic = wallet.mnemonic
    const address = await utils.getAccount({ mnemonic: mnemonic })
    console.log(address)
}
*/
