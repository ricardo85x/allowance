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
    dappError: ErrorProps;
}

type ErrorProps = {
    hasError: boolean;
    message: string;
}

const DappContext = createContext<DappProps>({} as DappProps)

export const DappContextProvider = ( { children } : DappContextProps ) => {

    const [accounts, setAccounts] = useState<string[]>([]);
    const [provider, setProvider] = useState<Web3Provider>()
    const [allowanceContract, setAllowanceContract] = useState<AllowanceProps>()
    const [fakeUSDContract, setFakeUSDContract] = useState<FakeUSDTokenProps>()
    const [dappError, setDappError] = useState<ErrorProps>({ hasError: false, message: "" })

    const [firstRun, setFirstRun] = useState(false)

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
                        listenAccountChange()
                        listenChainChange()
                        setFirstRun(true)
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

                    allowanceContractListener(_allowanceContract, _accounts[0], blockNumber);

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

            const message = "Metamask not detected, Please install metamask to use this App"
  

            notify(
                <>
                    <p><strong>Metamask not detected</strong></p>
                    <p>Please install Metamask to use this App</p>
                </>
            ,"error")

        }


    }

    const listenAccountChange = () => {
        try {
            if (window.ethereum) {
                (window.ethereum as any).on('accountsChanged', (_currentAccounts: string[]) => {
                    resetConnection()
                })
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
            }
        } catch (error) {
            console.log("Error, not metamask?", error)
        }
    }

    const allowanceContractListener = (_allowanceContract: AllowanceProps, _account: string, fromBlock: number) => {

    }

    const resetConnection = () => {
        setAccounts([])
        setProvider(undefined)
        setAllowanceContract(undefined)
        setDappError({ hasError: false, message: "" })
        handleConnect()
    }



    useEffect(() => {
        checkPreviousConnected()
    }, [])


    const value: DappProps = {
        accounts,
        handleConnect,
        dappError
    }

    return (
        <DappContext.Provider value={value}>
            {children}
        </DappContext.Provider>
    )

} 

export const useDapp = () => useContext(DappContext)