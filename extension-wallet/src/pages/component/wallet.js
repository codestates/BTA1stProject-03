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


}


module.exports = utils;