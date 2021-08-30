import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction, Export } from 'hardhat-deploy/types';

const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    // get the address of named account
    const { deployer } = await getNamedAccounts(); 


    const fakeUSDTokenContract = await deploy('FakeUSDToken', {
        from: deployer,
        args: [],
        log: false
    })

    await deploy('Allowance', {
        from: deployer,
        args: [fakeUSDTokenContract.address],
        log: true
    })

    console.log("deployer", deployer)

};

export default func;
func.tags = ['Allowance', 'FakeUSDCToken'];

export type MultiExport = {
    [chainId: string]: {[name: string]: Export};
};