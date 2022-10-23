import { ethers } from './ethers-5.1.esm.min.js'
import { abi, contractAddress } from './constants.js'


const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
connectButton.onclick = connect
fundButton.onclick = fund


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

async function fund() {
    const ethAmount = "0.1"

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
        } catch (e) {
            console.log(e);
        }
        console.log('this is signer', signer);



    }


}