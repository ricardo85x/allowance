import { Flex, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react"
import { Boss } from "../components/Boss"
import { Employee } from "../components/Employee"
import { Header } from "../components/Header"

export default function Home() {
  return (
    <Flex align="center" px={1}  direction="column" width="100%">
      <Header />

      <Tabs pt={5} width="100%" maxWidth={1050} variant="enclosed">
        <TabList>
          <Tab _selected={{ fontWeight: "medium", color: "gray.50", bg: "brown.600" }}>Boss</Tab>
          <Tab _selected={{ fontWeight: "medium",  color: "gray.50", bg: "brown.600" }}>Employee</Tab>
        </TabList>
        <TabPanels >
          <TabPanel px={0} >
            <Boss />
          </TabPanel>
          <TabPanel px={0} >
            <Employee />
          </TabPanel>
        </TabPanels>
      </Tabs>

    </Flex>
  )
}
