import {Flex, Heading, Button} from "@chakra-ui/react"

export const Employee = () => {

    return (
        <Flex width="100%" gridGap={5} direction="column">
            <Heading >Balance 0.05 ETH</Heading>
            <Button
                size="md"
                colorScheme="whiteAlpha"
                backgroundColor="brown.100"
                textColor="black"
                _hover={{ backgroundColor: "brown.50" }}
                px={10}
                maxW={120}
            >
                Withdraw all
            </Button>

            <Button
                size="md"
                colorScheme="red"
               
                px={10}
                maxW={220}
            >
                Quit Job and Withdraw all
            </Button>
        </Flex>
    )
}