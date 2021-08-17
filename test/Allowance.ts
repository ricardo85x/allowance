import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import chai from "chai"
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

const { expect } = chai

import { ethers, waffle } from "hardhat"
const { deployContract } = waffle

import AllowanceArtifact from "../src/artifacts/contracts/Allowance.sol/Allowance.json"
import { Allowance } from "../src/types/Allowance"

import FakeUSDTokenArtifact from "../src/artifacts/contracts/FakeUSDToken.sol/FakeUSDToken.json"
import { FakeUSDToken } from "../src/types/FakeUSDToken"


type Account = {
    address: string;
    position: string;
    name: string;
    signer: SignerWithAddress
}

describe("Allowance smart contract", () => {

    let allowanceContractAccount1: Allowance;
    let allowanceContractAccount2: Allowance;
    let allowanceContractAccount3: Allowance;

    let fakeUSDCTokenContractAccount1: FakeUSDToken;

    let signers: SignerWithAddress[] = [];

    let accounts: Account[] = [];

    const INITIAL_BALANCE = 100;
    const SALARY = 5;

    beforeEach(async () => {
        signers = await ethers.getSigners();


        for (let i = 0; i < signers.length; i++) {
            const signer = signers[i];
            const address = await signer.getAddress();
            const name = `Account #${i}`
            const position = ` Dev`
            const account = { name, address, signer, position };
            accounts.push(account);

            if (i > 10) {
                break;
            }
        }



        fakeUSDCTokenContractAccount1 = (await deployContract(signers[0], FakeUSDTokenArtifact)) as FakeUSDToken;

        allowanceContractAccount1 = (await deployContract(
            signers[0],
            AllowanceArtifact,
            [fakeUSDCTokenContractAccount1.address] // constructor args
        )) as Allowance;

        allowanceContractAccount2 = allowanceContractAccount1.connect(signers[1])
        allowanceContractAccount3 = allowanceContractAccount1.connect(signers[2])

    })

    it('should hire employees', async () => {

        await allowanceContractAccount1.hire(accounts[1].address, accounts[1].name,accounts[1].position, SALARY);

        expect((await allowanceContractAccount1.employee(accounts[1].address)).employed)
            .to.be.equals(true);

        expect((await allowanceContractAccount1.employee(accounts[1].address)).name)
            .to.be.equals(accounts[1].name);

        expect((await allowanceContractAccount1.employee(accounts[1].address)).boss)
            .to.be.equals(await accounts[0].address);
    })

    it("should fire", async () => {

        await allowanceContractAccount1.hire(accounts[1].address, accounts[1].name, accounts[1].position, SALARY);

        expect((await allowanceContractAccount1.employee(accounts[1].address)).employed)
            .to.be.equals(true);

        await allowanceContractAccount1.fire(accounts[1].address);

        expect((await allowanceContractAccount1.employee(accounts[1].address)).employed)
            .to.be.equals(false);

    })

    it("should deposit to an account", async () => {

        // get some free FakeUSDC
        await fakeUSDCTokenContractAccount1.GiveMeSome(INITIAL_BALANCE);

        // allow my FakeUSDC to be used for allowanceContractAccount1
        await fakeUSDCTokenContractAccount1.approveAll(allowanceContractAccount1.address);

        // hire a employee
        await allowanceContractAccount1.hire(accounts[1].address, accounts[1].name, accounts[1].position, SALARY);

        // expect to be the boss of this employee
        expect((await allowanceContractAccount1.employee(accounts[1].address)).boss)
            .to.be.equals(accounts[0].address);

        const previousBalance = (
            await allowanceContractAccount1.employee(accounts[1].address)
        ).balance;

        // pay him  salary
        await allowanceContractAccount1.payEmployee(accounts[1].address);

        // expect him to have a correct balance of fake USDC
        expect((await allowanceContractAccount1.employee(accounts[1].address)).balance)
            .to.be.equals(previousBalance.add(SALARY));

        // expect error on paying twice in the last 30 days
        await expect(
            allowanceContractAccount1.payEmployee(accounts[1].address)
        ).to.eventually.be.rejected;

    })

    it("should be able to pay bonus on shared wallet", async () => {


        const bonus = ethers.BigNumber.from(30)

        const employees = [1,2,3]

        // get some free FakeUSDC
        await fakeUSDCTokenContractAccount1.GiveMeSome(INITIAL_BALANCE);

        // allow my FakeUSDC to be used for allowanceContractAccount1
        await fakeUSDCTokenContractAccount1.approveAll(allowanceContractAccount1.address);

        // hire employees
        for (let i = 0; i < employees.length; i++) {
            await allowanceContractAccount1.hire(accounts[employees[i]].address, accounts[employees[i]].name, accounts[employees[i]].position, SALARY);
        }
       
        // previous employee balance
        let balance_employee = []
        for (let i = 0; i < employees.length; i++) {
            const balance = (await allowanceContractAccount1.employee(accounts[employees[i]].address)).balance
            balance_employee.push(balance)
        }

        // deposit on bonus shared wallet
        await allowanceContractAccount1.sharedBonusDeposit(bonus);

        // employees balance should update
        for (let i = 0; i < employees.length; i++) {
            expect(
                (await allowanceContractAccount1.employee(accounts[employees[i]].address)).balance
            ).to.be.equal(balance_employee[i].add(bonus.div(3)))
        }

    })

    it("should be able to withdrawAll", async () => {

        // get some free FakeUSDC
        await fakeUSDCTokenContractAccount1.GiveMeSome(INITIAL_BALANCE);

        // allow my FakeUSDC to be used for allowanceContractAccount1
        await fakeUSDCTokenContractAccount1.approveAll(allowanceContractAccount1.address);

        // hire a employee
        await allowanceContractAccount1.hire(accounts[1].address, accounts[1].name, accounts[1].position, SALARY);

        // pay his salary
        await allowanceContractAccount1.payEmployee(accounts[1].address)

        // get employee balance on smart contract
        const previousBalanceContract = (
            await allowanceContractAccount1.employee(accounts[1].address)
        ).balance;

        // get employee balance on his wallet
        const previousBalanceWallet = await fakeUSDCTokenContractAccount1.balanceOf(accounts[1].address);

        // employee withdraw all the money
        await allowanceContractAccount2.withdrawAll();

        // get employee balance on smart contract
        const newBalanceContract = (
            await allowanceContractAccount1.employee(accounts[1].address)
        ).balance;

        // get employee balance on his wallet
        const newBalanceWallet = await fakeUSDCTokenContractAccount1.balanceOf(accounts[1].address);

        // expect the balance on contract to be empty
        expect(newBalanceContract).to.be.equal(0);

        // expect his wallet to have previews balance plus balance from contract
        expect(newBalanceWallet)
            .to.be.equals(previousBalanceWallet.add(previousBalanceContract));

    })

    it("should fail to hire employed account", async () => {

        // boss 1 hired employee 1
        await allowanceContractAccount1.hire(accounts[1].address, accounts[1].name,  accounts[1].position, SALARY);

        // boss 3 should fail to hire employee 1
        await expect(allowanceContractAccount3.hire(accounts[1].address, accounts[1].name, accounts[1].position, SALARY))
            .to.eventually.be.rejectedWith("this person already has a job");

        // boss 1 fire employee 1
        await allowanceContractAccount1.fire(accounts[1].address);

        // now boss 3 should be able to hide employee 1
        expect(allowanceContractAccount3.hire(accounts[1].address, accounts[1].name, accounts[1].position, SALARY))
            .to.eventually.be.fulfilled;

    })

    it("should fail to hire itself", async () => {
        expect(allowanceContractAccount1.hire(accounts[0].address, accounts[0].name, accounts[0].position, SALARY))
            .to.eventually.be.rejectedWith("You, can't hire yourself")
    })
})