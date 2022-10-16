import {getOfflineSignerProto} from 'cosmjs-utils'
import {chains} from 'chain-registry'
import {FEES, osmosis} from 'osmojs'

// const config = require('../../config/config.json');
// const endPointUrl = config.endPoint.mainNet;



const utils = {
    getChain: async (chainName) => {  // 체인 이름을 토대로 체인 오브젝트 리턴
        return chains.find(({chain_name}) => chain_name === chainName);
    },

    getAddress: async (signer) => {  // 니모닉 코드와 체인정보를 사용해서 해당 지갑의 주소를 리턴
        let myAccount = await signer.getAccounts()
        return myAccount[0].address
    },
    getBalance: async (address,endPoint) => {  // 지갑의 주소와 엔드포인트를 사용해서 해당 지갑의 잔고를 리턴
        const {createRPCQueryClient} = osmosis.ClientFactory;
        const client = await createRPCQueryClient({rpcEndpoint: endPoint});
        return await client.cosmos.bank.v1beta1
            .allBalances({address: address})
    },
    getFee:  (amount) => {  // low , medium, high 에 해당하는 값의 수수료를 리턴
        return FEES.osmosis.swapExactAmountIn(amount)
    },
    getSigner:  async (mnemonic, chain) => {  // 사용자의 mnemonic과 체인을 사용하여 signer 리턴
        return await getOfflineSignerProto({
            mnemonic,
            chain
        })
    },
    // send: async (fromAddress,toAddress,amount,mnemonic) => {  // 입력한 양의 코인을 송금한 후 해당 트랜잭션 정보 리턴
    //     return null
    // },



}


module.exports = utils;