import {getOfflineSignerProto} from 'cosmjs-utils'
import {chains} from 'chain-registry'
import {FEES, osmosis,cosmos} from 'osmojs'
import {SigningStargateClient} from '@cosmjs/stargate'

// const config = require('../../config/config.json');
//  const endPointUrl = config.endPoint.mainNet;


export const mainNet = "https://osmosis-mainnet-rpc.allthatnode.com:26657"

export const utils = {
    getMnemonic: () => {
        // 18 단어로 생성
        const wallet = await DirectSecp256k1HdWallet.generate(18)
        // (월렛 필드)니모닉 코드 가져오기
        const mnemonic = wallet.mnemonic
        return mnemonic
    },
    getChain: (chainName) => {  // 체인 이름을 토대로 체인 오브젝트 리턴
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
    getSigningClient:async (endPoint, signer) => {  // 사용자의 signer와 endpoint를 사용하여 클라이언트 객체 리턴
        return  await SigningStargateClient.connectWithSigner(endPoint, signer);
    },
    sendOsmosis: async (fromAddress,toAddress,amount,feeAmount,signingClient) => {  // 입력한 양의 코인을 송금한 후 해당 트랜잭션 정보 리턴
        const {send} = cosmos.bank.v1beta1.MessageComposer.withTypeUrl;
        const msg = send({
            amount: [
                {
                    denom: 'uosmo',
                    amount: amount
                }
            ],
            toAddress: toAddress,
            fromAddress: fromAddress
        });

        const fee = {
            amount: [
                {
                    denom: 'uosmo',
                    amount: feeAmount.amount.amount
                }
            ],
            gas: feeAmount.gas
        };
        return  await signingClient.signAndBroadcast(fromAddress, [msg], fee);
    },
    



}

