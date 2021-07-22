import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import chai from "chai"
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

const { expect } = chai

import { ethers, waffle } from "hardhat"
const { deployContract } = waffle

import AllowanceArtifact from "../src/artifacts/contracts/Allowance.sol/Allowance.json"
import { Allowance } from "../src/types/Allowance"

type Account = {
    address: string;
    name: string;
    signer: SignerWithAddress
}

describe("Allowance smart contract", () => {
    
    let allowanceContractAccount1: Allowance;
    let allowanceContractAccount2: Allowance;
    let allowanceContractAccount3: Allowance;
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

        allowanceContractAccount1 = (await deployContract(signers[0], AllowanceArtifact)) as Allowance;
        allowanceContractAccount2 = allowanceContractAccount1.connect(signers[1])
        allowanceContractAccount3 = allowanceContractAccount1.connect(signers[2])
    })

    it('should hire employees', async () => {

        await allowanceContractAccount1.hire(accounts[1].address, accounts[1].name );

        expect((await allowanceContractAccount1.employee(accounts[1].address)).employed)
            .to.be.equals(true);

        expect((await allowanceContractAccount1.employee(accounts[1].address)).name)
            .to.be.equals(accounts[1].name);

        expect((await allowanceContractAccount1.employee(accounts[1].address)).boss)
            .to.be.equals(await accounts[0].address); 
    })

    it("should fire", async () => {

        await allowanceContractAccount1.hire(accounts[1].address, accounts[1].name );

        expect((await allowanceContractAccount1.employee(accounts[1].address)).employed)
            .to.be.equals(true);

        await allowanceContractAccount1.fire(accounts[1].address);

        expect((await allowanceContractAccount1.employee(accounts[1].address)).employed)
            .to.be.equals(false);

    })


    it("should deposit to an account", async () => {

        const salary = ethers.utils.parseEther("0.0005") // ETH

        await allowanceContractAccount1.hire(accounts[1].address, accounts[1].name );

        expect((await allowanceContractAccount1.employee(accounts[1].address)).boss)
            .to.be.equals(accounts[0].address);
        
        expect((await allowanceContractAccount1.employee(accounts[1].address)).balance)
            .to.be.equals(0);

        await allowanceContractAccount1.payEmployee(accounts[1].address, {
            value: salary
        })

        expect((await allowanceContractAccount1.employee(accounts[1].address)).balance)
            .to.be.equals(salary);

    })

    it("should be able to withdrawAll", async () => {

        const salary = ethers.utils.parseEther("0.0005") // ETH

        await allowanceContractAccount1.hire(accounts[1].address, accounts[1].name );

        await allowanceContractAccount1.payEmployee(accounts[1].address, {
            value: salary
        })

        expect((await allowanceContractAccount1.employee(accounts[1].address)).balance)
            .to.be.equals(salary);

        // withdrawAll is running from second account
        await allowanceContractAccount2.withdrawAll();

        expect((await allowanceContractAccount1.employee(accounts[1].address)).balance)
            .to.be.equals(0);
        
    })

    it("should fail to hire employed account", async () => {
        await allowanceContractAccount1.hire(accounts[1].address, accounts[1].name );
        expect(allowanceContractAccount3.hire(accounts[1].address, accounts[1].name ))
            .to.eventually.be.rejectedWith("this person already has a job"); 
    })

    it("should fail to hire itself", async () => {
        expect(allowanceContractAccount1.hire(accounts[0].address, accounts[0].name ))
            .to.eventually.be.rejectedWith("You, can't hire yourself")
    })
})