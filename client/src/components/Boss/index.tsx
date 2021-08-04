import { Flex, Box, Badge, Divider, Heading, Grid, Button, IconButton, Text, Tooltip } from "@chakra-ui/react"

import { FaMoneyBillAlt } from "react-icons/fa"
import { AiFillFire } from "react-icons/ai"

import { HireModal } from "./HireModal"
import { SharedDepositModal } from "./SharedDepositModal"

export const Boss = () => {

    const myEmployees = [
        { address: '0x1', name: 'Marcos', paid: 0 },
        { address: '0x2', name: 'Rose', paid: 1 },
        { address: '0x3', name: 'Tom', paid: 2 }
    ]

    return (

        <Flex width="100%" gridGap={3} direction="column">
            <Heading >My Employes</Heading>

            <Box>
                {myEmployees.length ? myEmployees.map(myEmployee => (
                    <Grid p={2} _hover={{
                        backgroundColor: "rgb(205,133,63,.1)",
                    }} key={myEmployee.address} templateColumns="1fr 100px 35px 35px" >

                        <Text>{myEmployee.name}</Text>

                        {
                            myEmployee.paid === 1 ?
                                <Badge margin="auto" colorScheme="green">paid</Badge> :
                                myEmployee.paid === 0 ?
                                    <Badge margin="auto" colorScheme="red">not paid</Badge> :
                                    <Badge margin="auto" colorScheme="orange">partially paid</Badge>

                        }


                        <Tooltip bg="brown.50" color="black" label="Deposit" aria-label="Deposit">
                            <IconButton title="Deposit" mx={1} size="xs" colorScheme="green" aria-label="Deposit" icon={<FaMoneyBillAlt />} />
                        </Tooltip>

                        <Tooltip bg="brown.50" color="black" label="Fire the emproyee" aria-label="Fire the emproyee">
                            <IconButton title="Fire the emproyee" mx={1} size="xs" colorScheme="red" aria-label="Fire the emproyee" icon={<AiFillFire />} />
                        </Tooltip>





                    </Grid>
                )) : (
                    <>
                        <Text> You have no employees... </Text>
                        <Text> Hire some employees </Text>
                    </>
                )}
            </Box>



            <Divider />

            <Heading >Hire Employee</Heading>

            <HireModal />



            <Divider />

            <Heading >Shared Wallet</Heading>

            <Text>The value deposited here, will be shared between all employes</Text>

            <SharedDepositModal />
           





        </Flex>




    )
}