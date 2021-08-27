import {Flex, Heading, Button} from "@chakra-ui/react"
import { ethers } from "ethers"
import { useEffect } from "react"
import { useState } from "react"
import { useDapp } from "../contexts/DappContext"
import { notify } from "../services/notify"

export const Employee = () => {


    const { allowanceContract, fakeUSDContract, balance } = useDapp()

    const handleWithdraw = async () => {
        if(allowanceContract?.withdrawAll){

            try {
                await allowanceContract.withdrawAll()
                notify("withdrawn requested, waiting for tx confirmation", "info")

            } catch (e) {
                notify("error on withdraw request, are you broke?", "info");
            }
        }
    }




    const handleAddTokenMetamask = async () => {

        if (window?.ethereum && fakeUSDContract?.address) {
          await (window.ethereum as any).request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: fakeUSDContract.address, 
                symbol: "FUSD",
                decimals: 18, 
              },
            },
          });
    
        }
    
      }
    


    

    return (
        <Flex width="100%" gridGap={5} direction="column">
            <Heading color="brown.500" >Balance {balance} FUSD</Heading>

            <Button
                size="md"
                colorScheme="whiteAlpha"
                backgroundColor="brown.100"
                textColor="black"
                _hover={{ backgroundColor: "brown.50" }}
                px={10}
                maxW={120}
                onClick={handleWithdraw}
            >
                Withdraw all
            </Button>

            <Button
                size="md"
                colorScheme="red"
               
                px={10}
                maxW={220}
            >
                Quit Job and Withdraw all
            </Button>

            <Button colorScheme="orange" maxW={220} onClick={handleAddTokenMetamask} >Add to FUSD to metamask</Button>
        </Flex>
    )
}