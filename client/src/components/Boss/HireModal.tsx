import { Flex, Button, Input, useDisclosure } from "@chakra-ui/react"

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"

import { useRef } from "react"

export const HireModal = () => {

    const initialFocusHireModalRef = useRef()

    const { isOpen, onOpen, onClose } = useDisclosure()

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
                                <Input ref={initialFocusHireModalRef} name="name" placeholder="Name" />
                                <Input name="position" placeholder="Position" />
                                <Input name="salary" placeholder="Salary in ETH" />


                            </Flex>

                        </ModalBody>

                        <ModalFooter>
                            <Button
                                size="md"
                                colorScheme="green"
                                px={10}
                                maxW={100}
                            >Hire</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
        </>
    )

}