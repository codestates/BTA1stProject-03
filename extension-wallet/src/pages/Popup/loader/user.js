import {  redirect } from 'react-router-dom';
export const userLoader = async () => {
    let values = await chrome.storage.local.get(['mnemonic'])
    if (!values.mnemonic) {
        return redirect('/')
    }
}
