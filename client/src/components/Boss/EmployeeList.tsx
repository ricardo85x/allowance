import { Flex, Box, Badge, Divider, Heading, Grid, Button, IconButton, Text, Tooltip } from "@chakra-ui/react"

import { FaMoneyBillAlt } from "react-icons/fa"
import { AiFillFire } from "react-icons/ai"

interface EmployeeListProps {
    employees: Array<{ address: string, name: string, paid: number }>
}

export const EmployeeList = ( { employees } : EmployeeListProps) => {

    return (
        <Box>
            {
                employees.length ? employees.map((employee, i) => (
                    <Grid 
                        p={2} 
                        borderRadius={5} 
                        backgroundColor={
                            i % 2 !== 0 ? 
                                "inherit": 
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
                            employee.paid === 1 ?
                                <Badge margin="auto" colorScheme="green">paid</Badge> :
                            employee.paid === 0 ?
                                <Badge margin="auto" colorScheme="red">not paid</Badge> :
                                <Badge margin="auto" colorScheme="orange">
                                    partially paid
                                </Badge>
                        }

                        <Tooltip 
                            bg="brown.50" 
                            color="black" 
                            label="Pay Salary" 
                            aria-label="Pay Salary"
                        >
                            <IconButton 
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
                        <Text> Hire some employees </Text>
                    </>
                )
            }
        </Box>
    )
}