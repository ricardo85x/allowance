import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import chai from "chai"
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

const { expect } = chai
import { ethers, waffle } from "hardhat"
const { deployContract } = waffle

import FakeUSDTokenArtifact from "../src/artifacts/contracts/FakeUSDToken.sol/FakeUSDToken.json"
import { FakeUSDToken } from "../src/types/FakeUSDToken"

type Account = {
    address: string;
    name: string;
    signer: SignerWithAddress
}

describe("Fake USDC TOkEN smart contract", () => {
    
    let fakeUSDCTokenContractAccount1: FakeUSDToken;
    let fakeUSDCTokenContractAccount2: FakeUSDToken;
    let fakeUSDCTokenContractAccount3: FakeUSDToken;
    let signers: SignerWithAddress[] = [];

    let accounts : Account[] = [];

    beforeEach( async () => {
        signers = await ethers.getSigners();

        signers.forEach( async (signer, index) => {
            accounts.push({
                name: `Account #${index}`,
                address: await signer.getAddress(),
                signer
            })
        })

        fakeUSDCTokenContractAccount1 = (await deployContract(signers[0], FakeUSDTokenArtifact)) as FakeUSDToken;
        fakeUSDCTokenContractAccount2 = fakeUSDCTokenContractAccount1.connect(signers[1])
        fakeUSDCTokenContractAccount3 = fakeUSDCTokenContractAccount1.connect(signers[2])
    })

    it('should give some coins to anyone', async () => {

        const AMOUNT = ethers.utils.parseEther("10")

        const totalSupply = await fakeUSDCTokenContractAccount1.totalSupply();

        await fakeUSDCTokenContractAccount1.GiveMeSome(AMOUNT)


        expect(fakeUSDCTokenContractAccount1.totalSupply()).to.eventually.be.equals(AMOUNT.add(totalSupply));


        await fakeUSDCTokenContractAccount2.GiveMeSome(AMOUNT)


        expect(fakeUSDCTokenContractAccount1.totalSupply()).to.eventually.be.equals(AMOUNT.add(totalSupply).add(AMOUNT));


    })

})