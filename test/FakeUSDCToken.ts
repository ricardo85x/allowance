import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import chai from "chai"
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

const { expect } = chai
import { ethers, waffle } from "hardhat"
const { deployContract } = waffle

import FakeUSDCTokenArtifact from "../src/artifacts/contracts/UsdcToken.sol/FakeUSDCToken.json"
import { FakeUSDCToken } from "../src/types/FakeUSDCToken"

type Account = {
    address: string;
    name: string;
    signer: SignerWithAddress
}

describe("Fake USDC TOkEN smart contract", () => {
    
    let fakeUSDCTokenContractAccount1: FakeUSDCToken;
    let fakeUSDCTokenContractAccount2: FakeUSDCToken;
    let fakeUSDCTokenContractAccount3: FakeUSDCToken;
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

        fakeUSDCTokenContractAccount1 = (await deployContract(signers[0], FakeUSDCTokenArtifact)) as FakeUSDCToken;
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