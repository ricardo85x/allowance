import {Flex,Box, Heading, Button} from "@chakra-ui/react"
export const Header = () => {


    return (
        <Flex mt={1} borderTopRadius={10} p={5} backgroundColor="brown.50" width="100%" maxWidth={1050} direction="row" align="center" justify="space-between" >
            <Heading color="brown.600">Allowance</Heading>
            <Box>
                <Button colorScheme="blackAlpha" backgroundColor="brown.600" _hover={{backgroundColor: "brown.200"}}>Connect</Button>
            </Box>
        </Flex>
    )

}