import { ethers } from './ethers-5.1.esm.min.js'
import { abi, contractAddress } from './constants.js'


const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
const getBalanceButton = document.getElementById("balanceButton")
const withdrawButton = document.getElementById("withdrawButton")
connectButton.onclick = connect
fundButton.onclick = fund
getBalanceButton.onclick = getBalance
withdrawButton.onclick = withdraw



console.log(ethers)
async function connect() {
    console.log('button pressed')
    if (typeof window.ethereum !== 'undefined') {
        console.log('object');
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        document.getElementById('connectButton').innerHTML = 'Connected!!!'


    } else {
        document.getElementById('connectButton').innerHTML = 'Install metamask!!'
    }
}


async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(contractAddress)
        console.log(balance.toString())
        console.log(ethers.utils.formatEther(balance))


    } else {
        console.log('Please ensure wallet is connected')
    }

}
async function fund() {
    const ethAmount = document.getElementById("ethAmount").value
    console.log('funding with ', ethAmount)
    if (typeof window.ethereum !== 'undefined') {
        //Provider => connection to the blockachian and the wallet itself
        //Signer => the account that is presently present knn the metamask that can initiaite and sign transactions 
        //COntract that we are interacting with (Contract ABI and the address)

        const provider = new ethers.providers.Web3Provider(window.ethereum);  // Accesss the blockchain through web3 provider
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount)
            })
            await listenForTransactionMine(transactionResponse, provider) // Confirming transactions
            console.log('done============>')
        } catch (e) {
            console.log(e);
        }
        console.log('this is signer', signer)

    }


}

function listenForTransactionMine(transactionResponse, provider) {
    console.log('transactionMine', transactionResponse)
    // The return new promise and the resolve() function ensures that this process is completed before heading to the next
    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log('completed', transactionReceipt.confirmations);
            resolve()
        })


    })
}

//Withdraw function 


async function withdraw() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('wuthdrawingggggg............................');
        //Provider => connection to the blockachian and the wallet itself
        //Signer => the account that is presently present knn the metamask that can initiaite and sign transactions 
        //COntract that we are interacting with (Contract ABI and the address)

        const provider = new ethers.providers.Web3Provider(window.ethereum);  // Accesss the blockchain through web3 provider
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.withdraw()
            await listenForTransactionMine(transactionResponse, provider) // Confirming transactions
            console.log('done============>')
        } catch (e) {
            console.log(e);
        }


    }


}