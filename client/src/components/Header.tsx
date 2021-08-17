import { Flex, Box, Heading, Button } from "@chakra-ui/react"


import { useDapp } from "../contexts/DappContext"

export const Header = () => {

    const { handleConnect, accounts } = useDapp()

    return (
        <Flex mt={1} borderTopRadius={10} p={5} backgroundColor="brown.50" width="100%" maxWidth={1050} direction="row" align="center" justify="space-between" >
            <Heading 
                color="brown.600"
                cursor="pointer"
                _hover={{color: "brown.500"}}
            >
                Allowance
            </Heading>
            <Box>
                <Button 
                    colorScheme="blackAlpha" 
                    backgroundColor="brown.600" 
                    _hover={{backgroundColor: "brown.200"}}

                    title={!! accounts.length ? accounts[0] : "Connect to your account"}

                    onClick={handleConnect}
                >
                    {!! accounts.length ? `0x...${accounts[0].substr(-4)}` : "Connect"}
                </Button>
            </Box>
        </Flex>
    )

}