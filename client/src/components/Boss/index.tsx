import { Flex, Box, Badge, Divider, Heading, Grid, Button, IconButton, Text, Tooltip } from "@chakra-ui/react"

import { FaMoneyBillAlt } from "react-icons/fa"
import { AiFillFire } from "react-icons/ai"

import { HireModal } from "./HireModal"
import { SharedDepositModal } from "./SharedDepositModal"

import { EmployeeList } from "./EmployeeList"

export const Boss = () => {

    const myEmployees = [
        { address: '0x1', name: 'Marcos', paid: 0 },
        { address: '0x2', name: 'Rose', paid: 1 },
        { address: '0x3', name: 'Tom', paid: 2 }
    ]

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

            <SharedDepositModal />
           





        </Flex>




    )
}