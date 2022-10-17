import { redirect } from 'react-router-dom'
import * as wallet from '../utils/wallet'

export default async function authAction({ request }) {
    let dataECryption = await chrome.storage.local.get(['auth'])
    if (!dataECryption) {
        redirect('/')
    }
    let formData = await request.formData()

    switch (request.method) {
        case 'POST':
            let pw = formData.get('password')
            if (!pw) {
                return
            }
            let hash = chrome.storage.local.get(['encryptPassword'])
            let pwtmp = wallet.utils.md5Encrypt(pw) 

            if (pwtmp === hash) {
                let decodeData = wallet.utils.aes256Decrypt(dataECryption, pw)
                chrome.storage.local.set([{ mnemonic: decodeData }])
                redirect('/user')
            }
            break
        default: 
            return
    }
}
