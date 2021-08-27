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
import { ethers } from "ethers"

import { useRef } from "react"
import { useDapp } from "../../contexts/DappContext"
import { notify } from "../../services/notify"

export const SharedDepositModal = () => {

    const {allowanceContract } = useDapp()

    const initialFocusHireModalRef = useRef()

    const bonusRef = useRef<HTMLInputElement>()

    const { isOpen, onOpen, onClose } = useDisclosure()


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

    const handleSharedDeposit = async () => {
        const bonus = bonusRef.current.value;

        if (bonus) {

            if(!bonus.match(/^\d+([.]\d+)?$/) || ethers.utils.parseEther(bonus).lte(0)){
                notify("Invalid bonus amount", "error")
                return
            }

            try {

                await allowanceContract.sharedBonusDeposit(
                    ethers.utils.parseEther(bonus)
                )

                notify("Bonus sent, waiting tx confirmation", "info")

                onClose()

            } catch (e) {
                notify("Error on send bonus","error")
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
                    Deposit
                </Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader backgroundColor="brown.50" fontWeight="medium">Deposit on Shared Wallet</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex direction="column" gridGap={2}>
                                <Input ref={bonusRef} name="value" placeholder="Value in FUSD" />
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
                                onClick={handleSharedDeposit}

                            >Deposit</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
        </>
    )

}