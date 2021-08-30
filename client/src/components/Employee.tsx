import { Flex, Heading, Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useEffect } from "react";
import { useState } from "react";

import { FaMoneyBillAlt } from "react-icons/fa";
import { AiFillFire } from "react-icons/ai";

import { useDapp } from "../contexts/DappContext";
import { notify } from "../services/notify";

export const Employee = () => {
  const { allowanceContract, fakeUSDContract, balance } = useDapp();


  const handleQuitJob = async () => {

    if (allowanceContract?.quitJobAndWithDrawAll) {
        try {
          await allowanceContract.quitJobAndWithDrawAll();
          notify("Quit job request sent, waiting for tx confirmation", "info");
        } catch (e) {
          notify("error on quit job, are you sure you have a job?", "error");
        }
      }


  }

  const handleWithdraw = async () => {
    if (allowanceContract?.withdrawAll) {
      try {
        await allowanceContract.withdrawAll();
        notify("withdraw requested, waiting for tx confirmation", "info");
      } catch (e) {
        notify("error on withdraw request, are you broke?", "info");
      }
    }
  };

  const handleAddTokenMetamask = async () => {
    if (window?.ethereum && fakeUSDContract?.address) {
      await (window.ethereum as any).request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: fakeUSDContract.address,
            symbol: "FUSD",
            decimals: 18,
          },
        },
      });
    }
  };

  return (
    <Flex width="100%" gridGap={5} direction="column">
      <Heading color="brown.500">Balance {balance} FUSD</Heading>

      <Flex gridGap={2} flexWrap="wrap">

        <Button
          leftIcon={<FaMoneyBillAlt />}
          size="sm"
          colorScheme="whiteAlpha"
          backgroundColor="brown.100"
          textColor="black"
          _hover={{ backgroundColor: "brown.50" }}
       
          onClick={handleWithdraw}
        >
          Withdraw all
        </Button>

        <Button
          leftIcon={<AiFillFire />}
          size="sm"
          colorScheme="red"
          onClick={handleQuitJob}
        
        >
          Quit Job and Withdraw all
        </Button>

        <Button

          size="sm"
          colorScheme="orange"
          onClick={handleAddTokenMetamask}
        >
          Add to FUSD to metamask
        </Button>
      </Flex>
    </Flex>
  );
};
