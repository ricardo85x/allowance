import { Flex, Box, Badge, Divider, Heading, Grid, Button, IconButton, Text, Tooltip } from "@chakra-ui/react"

import { FaMoneyBillAlt } from "react-icons/fa"
import { AiFillFire } from "react-icons/ai"
import { useDapp } from "../../contexts/DappContext"
import { notify } from "../../services/notify"
import { ethers } from "ethers"

type EmployeeProps = {
    address: string, name: string, paid: boolean, salary: string
}
interface EmployeeListProps {
    employees: Array<EmployeeProps>
}

export const EmployeeList = ({ employees }: EmployeeListProps) => {





    const { allowanceContract, fakeUSDContract, accounts } = useDapp()


    const checkAllowance = async (value: ethers.BigNumber) => {

        const approvedAllowance = await fakeUSDContract.allowance(accounts[0], allowanceContract.address)

        console.log("allowance", approvedAllowance)
    

        if (!(approvedAllowance >= value)) {


            notify("Please approve FUSD before paying your employees", "info")

            console.log("request", value.toString())

            console.log("approved", approvedAllowance.toString())

            return false

        }

        return true


    }

    const handlePayEmployee = async (employee: EmployeeProps) => {


        if (await checkAllowance( ethers.BigNumber.from(employee.salary))) {
            await allowanceContract.payEmployee(employee.address)
            notify("Payment was sent, waiting for tx confirmation", "info")
        }



    }

    const handleFireEmployee = async (address: string) => {

        await allowanceContract.fire(address)
        notify("Employee was fired, waiting for tx confirmation", "info")




    }

    return (
        <Box>
            {
                employees.length ? employees.map((employee, i) => (
                    <Grid
                        p={2}
                        borderRadius={5}
                        backgroundColor={
                            i % 2 !== 0 ?
                                "inherit" :
                                "rgb(205,133,63,.05)"
                        }
                        _hover={{
                            backgroundColor: "rgb(255, 214, 171,0.4)",
                        }}
                        key={employee.address}
                        templateColumns="1fr 100px 35px 35px"
                    >
                        <Text>{employee.name}</Text>
                        {
                            employee.paid ?
                                <Tooltip label="already paid this month" >
                                    <Badge margin="auto" colorScheme="green">paid</Badge>
                                </Tooltip>
                                 :<Tooltip label="You did not paid this employee this month">
                                     <Badge margin="auto" colorScheme="red">not paid</Badge> 
                                 </Tooltip>
                                
                                   
                        }

                        <Tooltip
                            bg="brown.50"
                            color="black"
                            label="Pay Salary"
                            aria-label="Pay Salary"
                        >
                            <IconButton
                                onClick={() => handlePayEmployee(employee)}
                                title="Pay Salary"
                                mx={1}
                                size="xs"
                                colorScheme="green"
                                aria-label="Pay Salary"
                                icon={<FaMoneyBillAlt />}
                            />
                        </Tooltip>

                        <Tooltip
                            bg="brown.50"
                            color="black"
                            label="Fire the employee"
                            aria-label="Fire the employee"
                        >
                            <IconButton
                                onClick={() => handleFireEmployee(employee.address)}
                                title="Fire the employee"
                                mx={1}
                                size="xs"
                                colorScheme="red"
                                aria-label="Fire the employee"
                                icon={<AiFillFire />}
                            />
                        </Tooltip>
                    </Grid>
                ))
                    :
                    (
                        <>
                            <Text> You have no employees... </Text>
                            <Text> Hire some employees and get a subsistence allowance of 5000 FUSD </Text>
                        </>
                    )
            }
        </Box>
    )
}