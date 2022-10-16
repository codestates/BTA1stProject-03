import {getOfflineSignerProto} from 'cosmjs-utils'
import {chains} from 'chain-registry'
import {FEES, osmosis} from 'osmojs'
const config = require('../../config/config.json');
const endPointUrl = config.endPoint.mainNet;



const utils = {
    getAddress: async (mnemonic) => {  // 니모닉 코드를 사용해서 해당 지갑의 주소를 리턴
        const chain = chains.find(({chain_name}) => chain_name === 'osmosis');
        const signer = await getOfflineSignerProto({
            mnemonic,
            chain
        });
        let myAccount = await signer.getAccounts()
        let myAddress = myAccount[0].address
        return myAddress
    },
    getBalance: async (address) => {  // 지갑의 주소를 사용해서 해당 지갑의 잔고를 리턴
        const {createRPCQueryClient} = osmosis.ClientFactory;
        const client = await createRPCQueryClient({rpcEndpoint: endPointUrl});
        return await client.cosmos.bank.v1beta1
            .allBalances({address: address})
    },
    getFee: async (amount) => {  // low , medium, high 에 해당하는 값의 수수료를 리턴
        return FEES.osmosis.swapExactAmountIn(amount)
    },


}


module.exports = utils;