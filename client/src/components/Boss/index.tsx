import { Flex, Divider, Heading, Text, Button } from "@chakra-ui/react"
import { HireModal } from "./HireModal"
import { SharedDepositModal } from "./SharedDepositModal"

import { EmployeeList } from "./EmployeeList"

import {  useDapp } from "../../contexts/DappContext"
import { useEffect, useState } from "react"
import { ethers } from "ethers"



type EmployeesProps  = {
    name: string;    
    address: string;
    paid: boolean;
    salary: string;
}

export const Boss = () => {

    
    const { fakeUSDContract, allowanceContract, accounts, myEmployees } = useDapp()


    const handleApproveFUSD = () => {
        if (accounts.length && !! fakeUSDContract?.approve && allowanceContract?.address) {
            fakeUSDContract.approve(allowanceContract.address, ethers.utils.parseEther("999999999"))

            console.log("to approve",ethers.utils.parseEther("999999999").toString() )
        }
    }

    
    return (

        <Flex width="100%" gridGap={3} direction="column">
            <Heading color="brown.500"  >My Employes</Heading>

            <EmployeeList employees={myEmployees} />

            <Divider borderBottomColor="brown.50" />

            <Heading color="brown.500"  >Hire Employee</Heading>

            <HireModal />



            <Divider borderBottomColor="brown.50" />

            <Heading color="brown.500"  >Shared Bonus Wallet</Heading>

            <Text>The value deposited here, will be shared between all employees</Text>



            <Divider borderBottomColor="brown.50" />



            


            <SharedDepositModal />


            <Divider borderBottomColor="brown.50" />

            <Text>Approve FUSD to pay your employees</Text>
            <Button
                    onClick={handleApproveFUSD}
                    size="xs"
                    colorScheme="whiteAlpha"
                    backgroundColor="brown.100"
                    textColor="black"
                    _hover={{ backgroundColor: "brown.50" }}
                    px={10}
                    maxW={100}
                >
                    Approve FUSD
                </Button>
            





        </Flex>




    )
}