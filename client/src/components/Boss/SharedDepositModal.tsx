import { Flex, Button, Input, useDisclosure, Text} from "@chakra-ui/react"

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

export const SharedDepositModal = () => {

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
                    Deposit
                </Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader backgroundColor="brown.50" fontWeight="medium">Deposit on Shared Wallet</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex direction="column" gridGap={2}>
                                <Input name="value" placeholder="Value in ETH" />
                            </Flex>

                        </ModalBody>

                        <ModalFooter>
                            <Text fontSize="0.9em">The value deposited here, will be shared between all employes

</Text>
                            <Button
                                size="md"
                                colorScheme="green"
                                px={10}
                                maxW={100}
                            >Deposit</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
        </>
    )

}