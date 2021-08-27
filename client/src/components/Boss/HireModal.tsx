import { Flex, Button, Input, useDisclosure, position } from "@chakra-ui/react"

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"

import { ethers } from "ethers"

import { useRef } from "react"

import { useDapp } from "../../contexts/DappContext"
import { notify } from "../../services/notify"

export const HireModal = () => {


    const { validAddress, allowanceContract } = useDapp()

    const nameRef = useRef<HTMLInputElement>()
    const positionRef = useRef<HTMLInputElement>()
    const salaryRef = useRef<HTMLInputElement>()
    const addressRef = useRef<HTMLInputElement>()

    const { isOpen, onOpen, onClose } = useDisclosure()


    const handleHireEmployee = async () => {

        const [ name, position, salary, address ] = [
            nameRef.current.value,
            positionRef.current.value,
            salaryRef.current.value,
            addressRef.current.value
        ]

        // not empty
        if (name && position && salary && address) {

            if(!validAddress(address)){
                notify("Invalid wallet address", "error")

                return
            } 

            if(!salary.match(/^\d+([.]\d+)?$/) || ethers.utils.parseEther(salary).lte(0)){
                notify("Invalid Salary", "error")
                
                return
            }

            try {


                await allowanceContract.hire(
                    address,
                    name, 
                    position, 
                    ethers.utils.parseEther(salary)
                )

                notify("Employee hired, waiting for confirmation", "info")

                onClose()

            } catch (e) {

                notify("This employee already has a job","error")

                // console.log(e)
            }
        
          


        }


        

        

    }



    return (
        <>
            <Button
                    onClick={onOpen}
                    size="md"
                    colorScheme="whiteAlpha"
                    backgroundColor="brown.100"
                    textColor="black"
                    _hover={{ backgroundColor: "brown.50" }}
                    px={10}
                    maxW={100}
                >
                    Hire
                </Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader backgroundColor="brown.50" fontWeight="medium">Hire a new Employee</ModalHeader>

                        <ModalCloseButton />
                        <ModalBody>
                            <Flex direction="column" gridGap={2}>
                                <Input ref={nameRef} name="name" placeholder="Name" />
                                <Input ref={addressRef} name="user_address" placeholder="Employee Wallet address" />
                                <Input ref={positionRef} name="position" placeholder="Position" />
                                <Input ref={salaryRef} name="salary" placeholder="Salary in FUSD" />

                                
                            </Flex>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                size="md"
                                colorScheme="green"
                                px={10}
                                maxW={100}
                                onClick={handleHireEmployee}
                            >Hire</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
        </>
    )

}