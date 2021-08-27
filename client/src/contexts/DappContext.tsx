import { ReactNode, createContext, useContext, useState, useEffect } from "react"

import { ethers } from "ethers"
import { ExternalProvider, Web3Provider } from "@ethersproject/providers/lib"

import AllowanceGanache from "../hardhat-deploy/ganache/Allowance.json"
import AllowanceRopsten from "../hardhat-deploy/ropsten/Allowance.json"
import { Allowance as AllowanceProps } from "../../../src/types/Allowance"

import FakeUSDTokenGanache from "../hardhat-deploy/ganache/FakeUSDToken.json"
import FakeUSDTokenRopsten from "../hardhat-deploy/ropsten/FakeUSDToken.json"
import { FakeUSDToken as FakeUSDTokenProps } from "../../../src/types/FakeUSDToken"


import { notify } from "../services/notify";



declare global {
    interface Window {
        ethereum?: ExternalProvider;
    }
}

interface DappContextProps {
    children: ReactNode
}

interface DappProps {
    accounts: Array<string>;
    handleConnect: () => void;
    validAddress: ( value: string) => boolean;
    dappError: ErrorProps;
    allowanceContract: AllowanceProps;
    fakeUSDContract:FakeUSDTokenProps;
    myEmployees: Array<EmployeesProps>;
    balance: string;
}

type ErrorProps = {
    hasError: boolean;
    message: string;
}

export type EmployeesProps  = {
    name: string;    
    address: string;
    paid: boolean;
    salary: string;
}

const DappContext = createContext<DappProps>({} as DappProps)

export const DappContextProvider = ( { children } : DappContextProps ) => {

    const [accounts, setAccounts] = useState<string[]>([]);
    const [provider, setProvider] = useState<Web3Provider>()
    const [allowanceContract, setAllowanceContract] = useState<AllowanceProps>()
    const [fakeUSDContract, setFakeUSDContract] = useState<FakeUSDTokenProps>()
    const [dappError, setDappError] = useState<ErrorProps>({ hasError: false, message: "" })

    const [firstRun, setFirstRun] = useState(true)

    const [myEmployees, setMyEmployees] = useState<EmployeesProps[]>([]);

    const [balance, setBalance] = useState("0")

    const validNetworks = {
        "1337": "Ganache",
        "3": "Ropsten"
    }


    const isMetamaskLogged = async () => {

        if (window.ethereum) {

            const _provider = new ethers.providers.Web3Provider(window.ethereum);
            const _accounts = await _provider.listAccounts();
            return !!_accounts.length;
        } 

        return false;

    }

    const checkPreviousConnected = async () => {

        if (window.ethereum && window.ethereum.request) {

            if (await isMetamaskLogged()) {
                const _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];
                if (_accounts.length) {
                    handleConnect();
                }
            }
        } else {
            setDappError({
                hasError: true,
                message: "Metamask not detected, Please install metamask to use this App"
            })
        }
    }

    const handleConnect = async () => {

        if (window.ethereum && window.ethereum.request) {

            try {

                if (!provider) {
                    const _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];

                    const _provider = new ethers.providers.Web3Provider(window.ethereum)

                    if (firstRun) {
                        console.log("first run")
                        listenAccountChange()
                        listenChainChange()
                        setFirstRun(false)
                    }

                    const blockNumber = await _provider.getBlockNumber()

                    const signer = _provider.getSigner();

                    const network = await _provider.getNetwork()

                    if (!Object.keys(validNetworks).includes(network.chainId.toString())) {

                        notify(
                            "Wrong network, change your network to " +
                                Object.values(validNetworks)
                                    .join(" or ")
                            ,"error"
                        )
                        return;
                    }

                    const currentNetwork = validNetworks[network.chainId.toString()]

                    const AllowanceArtifact = currentNetwork == "Ganache" ? AllowanceGanache : AllowanceRopsten
                    const _allowanceContract = new ethers.Contract(AllowanceArtifact.address, AllowanceArtifact.abi, signer) as any as AllowanceProps

                    const FakeUSDTokenArtifact = currentNetwork == "Ganache" ? FakeUSDTokenGanache : FakeUSDTokenRopsten
                    const _fakeUSDTokenContract = new ethers.Contract(FakeUSDTokenArtifact.address, FakeUSDTokenArtifact.abi, signer) as any as FakeUSDTokenProps

                    !!_allowanceContract && _allowanceContract.removeAllListeners();

                    loadEmployees(_allowanceContract);

                    loadBalance(_accounts[0],_allowanceContract);

                    allowanceContractListener(_allowanceContract, _accounts[0], blockNumber);
                    fakeUSDTokenContractListener(_fakeUSDTokenContract, _accounts[0], blockNumber);

                    setAccounts(_accounts)
                    setProvider(_provider)
                    setAllowanceContract(_allowanceContract)
                    setFakeUSDContract(_fakeUSDTokenContract)

                } else {
                    console.log("no provider?")
                }

            } catch (e) {

            }

        } else {

            notify(
                <>
                    <p><strong>Metamask not detected</strong></p>
                    <p>Please install Metamask to use this App</p>
                </>
            ,"error")

        }


    }

    const loadBalance = async (_account: string, _allowanceContract: AllowanceProps) => {
        if(_account && _allowanceContract?.employee){
            const _balance = (await _allowanceContract.employee(_account)).balance

            if( _balance) {
                setBalance(ethers.utils.formatEther(_balance))
            }
        }
    }

    const loadEmployees = async (_allowanceContract: AllowanceProps) => {
        if (!! _allowanceContract?.myEmployees) {

            const employees = await _allowanceContract.myEmployees()

            const _employees: EmployeesProps[] = []

            console.log("my employees",employees)

            if (employees.length){
                console.log(employees[0].paymentDate.toNumber())


                for(let i = 0; i < employees.length; i++){
                    

                    const current_employee = employees[i]
                    if(current_employee.employed){

                        try{
                            await _allowanceContract.alreadyPaid(current_employee._address)
                        } catch(e){
                            console.log("oups", e)
                        }

                        const paid = (await _allowanceContract.alreadyPaid(current_employee._address));

                        _employees.push({
                            name: current_employee.name,
                            address: current_employee._address,
                            paid,
                            salary: current_employee.salary.toString()
                        })

                    }

                }

                
            }



           
            setMyEmployees(_employees)
            

        } 
    }

    const listenAccountChange = () => {
        try {
            if (window.ethereum) {
                (window.ethereum as any).on('accountsChanged', (_currentAccounts: string[]) => {
                    resetConnection()
                })
            } else {
                console.log("nada.... account")

            }
        } catch (error) {
            console.log("Error, not metamask?", error)
        }
    }

    const listenChainChange = () => {
        try {
            if (window.ethereum) {

                (window.ethereum as any).on('chainChanged', (_chainID) => {
                    resetConnection()
                })
            } else {
                console.log("nada.... chain")
            }
        } catch (error) {
            console.log("Error, not metamask?", error)
        }
    }


    const fakeUSDTokenContractListener = (_fakeUSDTokenContract: FakeUSDTokenProps, _account: string, fromBlock: number) => {

        const approveFromUser = _fakeUSDTokenContract.filters.approveEvent(_account);
        _fakeUSDTokenContract.on(approveFromUser, (...args: any[]) => {
            // only future events
            const currentBlock = args[args.length - 1].blockNumber as number;

            if (currentBlock > fromBlock) {
                notify("FUSD Approved, now you can pay your employees","info")
            }
        })

        const freeFUSDFromUser = _fakeUSDTokenContract.filters.giveToEvent(undefined, _account);
        _fakeUSDTokenContract.on(freeFUSDFromUser, (...args: any[]) => {

            // only future events
            const currentBlock = args[args.length - 1].blockNumber as number;

            if (currentBlock > fromBlock) {
                notify("You just received some free FUSD to help in your new business ","info")
            }
        })


    }
    const allowanceContractListener = (_allowanceContract: AllowanceProps, _account: string, fromBlock: number) => {

        const hireEventFromUser = _allowanceContract.filters.hireEvent(_account,  null);

        _allowanceContract.on(hireEventFromUser, (...args: any[]) => {
            // only future events
            const currentBlock = args[args.length - 1].blockNumber as number;

            if (currentBlock > fromBlock) {
                loadEmployees(_allowanceContract);
                notify("The employee was hired","info")
            }
        })

        const fireEventFromUser = _allowanceContract.filters.fireEvent(_account,  null);

        _allowanceContract.on(fireEventFromUser, (...args: any[]) => {
            // only future events
            const currentBlock = args[args.length - 1].blockNumber as number;

            if (currentBlock > fromBlock) {
                loadEmployees(_allowanceContract);
                notify("The employee was fired","info")
            }
        })

        const payEmployeeEventFromUser = _allowanceContract.filters.payEmployeeEvent(_account,  null);

        _allowanceContract.on(payEmployeeEventFromUser, (...args: any[]) => {
            // only future events
            const currentBlock = args[args.length - 1].blockNumber as number;

            if (currentBlock > fromBlock) {
                loadEmployees(_allowanceContract);
                notify("Payment confirmed","info")
            }
        })

        const sharedDepositEventFromUser = _allowanceContract.filters.sharedBonusDepositEvent(_account);

        _allowanceContract.on(sharedDepositEventFromUser, (...args: any[]) => {
            // only future events
            const currentBlock = args[args.length - 1].blockNumber as number;

            if (currentBlock > fromBlock) {
                notify("Shared deposit confirmed","info")
            }
        })


        const withdrawnEventFromUser = _allowanceContract.filters.withDrawnAllEvent(_account);

        _allowanceContract.on(withdrawnEventFromUser, (...args: any[]) => {
            // only future events
            const currentBlock = args[args.length - 1].blockNumber as number;

            if (currentBlock > fromBlock) {
                notify("Withdrawn confirmed","info")
                loadBalance(_account, _allowanceContract)
            }
        })

    }

    /* 
    
    const [dappError, setDappError] = useState<ErrorProps>({ hasError: false, message: "" })

    const [firstRun, setFirstRun] = useState(false)

    const [myEmployees, setMyEmployees] = useState<EmployeesProps[]>([]);

    const [balance, setBalance] = useState("0")

    const validNetworks = {
        "1337": "Ganache",
        "3": "Ropsten"
    }

    
    */

    const resetConnection = () => {
        setAccounts([])
        setProvider(undefined)
        setAllowanceContract(undefined)
        setFakeUSDContract(undefined)
        setDappError({ hasError: false, message: "" })
        setMyEmployees([])
        setBalance("0")
        handleConnect()
    }

    const validAddress = (value: string) => {
        return ethers.utils.isAddress(value)
    }

    useEffect(() => {
        checkPreviousConnected()
    }, [])

    
    const value: DappProps = {
        accounts,
        handleConnect,
        dappError,
        validAddress,
        allowanceContract,
        fakeUSDContract,
        myEmployees,
        balance
    }

    return (
        <DappContext.Provider value={value}>
            {children}
        </DappContext.Provider>
    )

} 

export const useDapp = () => useContext(DappContext)