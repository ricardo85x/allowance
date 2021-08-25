/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface AllowanceInterface extends ethers.utils.Interface {
  functions: {
    "alreadyPaid(address)": FunctionFragment;
    "currency()": FunctionFragment;
    "employee(address)": FunctionFragment;
    "fire(address)": FunctionFragment;
    "hire(address,string,string,uint256)": FunctionFragment;
    "job(address)": FunctionFragment;
    "myEmployees()": FunctionFragment;
    "payEmployee(address)": FunctionFragment;
    "sharedBonusDeposit(uint256)": FunctionFragment;
    "withdrawAll()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "alreadyPaid", values: [string]): string;
  encodeFunctionData(functionFragment: "currency", values?: undefined): string;
  encodeFunctionData(functionFragment: "employee", values: [string]): string;
  encodeFunctionData(functionFragment: "fire", values: [string]): string;
  encodeFunctionData(
    functionFragment: "hire",
    values: [string, string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "job", values: [string]): string;
  encodeFunctionData(
    functionFragment: "myEmployees",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "payEmployee", values: [string]): string;
  encodeFunctionData(
    functionFragment: "sharedBonusDeposit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawAll",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "alreadyPaid",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "currency", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "employee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fire", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hire", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "job", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "myEmployees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "payEmployee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sharedBonusDeposit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawAll",
    data: BytesLike
  ): Result;

  events: {};
}

export class Allowance extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: AllowanceInterface;

  functions: {
    alreadyPaid(
      _address: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    currency(overrides?: CallOverrides): Promise<[string]>;

    employee(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        string,
        string,
        string,
        boolean,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        boss: string;
        name: string;
        position: string;
        _address: string;
        employed: boolean;
        salary: BigNumber;
        paymentDate: BigNumber;
        balance: BigNumber;
        oldBalance: BigNumber;
      }
    >;

    fire(
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    hire(
      _address: string,
      _name: string,
      _position: string,
      _salary: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    job(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { boss: string; balance: BigNumber }>;

    myEmployees(
      overrides?: CallOverrides
    ): Promise<
      [
        ([
          string,
          string,
          string,
          string,
          boolean,
          BigNumber,
          BigNumber,
          BigNumber,
          BigNumber
        ] & {
          boss: string;
          name: string;
          position: string;
          _address: string;
          employed: boolean;
          salary: BigNumber;
          paymentDate: BigNumber;
          balance: BigNumber;
          oldBalance: BigNumber;
        })[]
      ]
    >;

    payEmployee(
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    sharedBonusDeposit(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  alreadyPaid(_address: string, overrides?: CallOverrides): Promise<boolean>;

  currency(overrides?: CallOverrides): Promise<string>;

  employee(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [
      string,
      string,
      string,
      string,
      boolean,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ] & {
      boss: string;
      name: string;
      position: string;
      _address: string;
      employed: boolean;
      salary: BigNumber;
      paymentDate: BigNumber;
      balance: BigNumber;
      oldBalance: BigNumber;
    }
  >;

  fire(
    _address: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  hire(
    _address: string,
    _name: string,
    _position: string,
    _salary: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  job(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber] & { boss: string; balance: BigNumber }>;

  myEmployees(
    overrides?: CallOverrides
  ): Promise<
    ([
      string,
      string,
      string,
      string,
      boolean,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ] & {
      boss: string;
      name: string;
      position: string;
      _address: string;
      employed: boolean;
      salary: BigNumber;
      paymentDate: BigNumber;
      balance: BigNumber;
      oldBalance: BigNumber;
    })[]
  >;

  payEmployee(
    _address: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  sharedBonusDeposit(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawAll(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    alreadyPaid(_address: string, overrides?: CallOverrides): Promise<boolean>;

    currency(overrides?: CallOverrides): Promise<string>;

    employee(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        string,
        string,
        string,
        boolean,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        boss: string;
        name: string;
        position: string;
        _address: string;
        employed: boolean;
        salary: BigNumber;
        paymentDate: BigNumber;
        balance: BigNumber;
        oldBalance: BigNumber;
      }
    >;

    fire(_address: string, overrides?: CallOverrides): Promise<void>;

    hire(
      _address: string,
      _name: string,
      _position: string,
      _salary: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    job(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { boss: string; balance: BigNumber }>;

    myEmployees(
      overrides?: CallOverrides
    ): Promise<
      ([
        string,
        string,
        string,
        string,
        boolean,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        boss: string;
        name: string;
        position: string;
        _address: string;
        employed: boolean;
        salary: BigNumber;
        paymentDate: BigNumber;
        balance: BigNumber;
        oldBalance: BigNumber;
      })[]
    >;

    payEmployee(_address: string, overrides?: CallOverrides): Promise<void>;

    sharedBonusDeposit(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawAll(overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    alreadyPaid(
      _address: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    currency(overrides?: CallOverrides): Promise<BigNumber>;

    employee(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    fire(
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    hire(
      _address: string,
      _name: string,
      _position: string,
      _salary: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    job(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    myEmployees(overrides?: CallOverrides): Promise<BigNumber>;

    payEmployee(
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    sharedBonusDeposit(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    alreadyPaid(
      _address: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    currency(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    employee(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    fire(
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    hire(
      _address: string,
      _name: string,
      _position: string,
      _salary: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    job(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    myEmployees(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    payEmployee(
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    sharedBonusDeposit(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
