import { Flex, Divider, Heading, Text } from "@chakra-ui/react"
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

    const { allowanceContract, accounts } = useDapp()


    const [myEmployees, setMyEmployees] = useState<EmployeesProps[]>([])



    const loadEmployees = async () => {
        if (accounts.length && !! allowanceContract) {

            const employees = await allowanceContract.myEmployees()

            const _employees: EmployeesProps[] = []

            console.log("my employees",employees)

            if (employees.length){
                console.log(employees[0].paymentDate.toNumber())


                for(let i = 0; i < employees.length; i++){
                    

                    const current_employee = employees[i]
                    if(current_employee.employed){
                        const paid = (await allowanceContract.alreadyPaid(current_employee._address));

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


    useEffect(() => {
        setTimeout(() => loadEmployees(), 1000)
    }, [accounts, allowanceContract])


    

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