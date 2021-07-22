import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    // get the address of named account
    const { deployer } = await getNamedAccounts(); 

    await deploy('Allowance', {
        from: deployer,
        args: [],
        log: true
    })

    console.log("deployer", deployer)

};

export default func;
func.tags = ['Allowance'];