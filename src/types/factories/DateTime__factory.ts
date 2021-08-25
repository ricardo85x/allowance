/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { DateTime, DateTimeInterface } from "../DateTime";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "getDay",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "month",
        type: "uint8",
      },
      {
        internalType: "uint16",
        name: "year",
        type: "uint16",
      },
    ],
    name: "getDaysInMonth",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "getHour",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "getMinute",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "getMonth",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "getSecond",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "getWeekday",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "getYear",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "year",
        type: "uint16",
      },
    ],
    name: "isLeapYear",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "year",
        type: "uint256",
      },
    ],
    name: "leapYearsBefore",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "year",
        type: "uint16",
      },
      {
        internalType: "uint8",
        name: "month",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "day",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "hour",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "minute",
        type: "uint8",
      },
    ],
    name: "toTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "year",
        type: "uint16",
      },
      {
        internalType: "uint8",
        name: "month",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "day",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "hour",
        type: "uint8",
      },
    ],
    name: "toTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "year",
        type: "uint16",
      },
      {
        internalType: "uint8",
        name: "month",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "day",
        type: "uint8",
      },
    ],
    name: "toTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "year",
        type: "uint16",
      },
      {
        internalType: "uint8",
        name: "month",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "day",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "hour",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "minute",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "second",
        type: "uint8",
      },
    ],
    name: "toTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506115b2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80639054bdec1161008c578063a6f0e57711610066578063a6f0e577146102cf578063b1999937146102ff578063b238ad0e1461032f578063fa93f8831461035f576100ea565b80639054bdec1461023f57806392d663131461026f578063a324ad241461029f576100ea565b806365c72840116100c857806365c728401461017f5780637f791833146101af5780638aa001fc146101df5780638c8d98a01461020f576100ea565b80633e239e1a146100ef5780634ac1ad781461011f57806362ba96871461014f575b600080fd5b61010960048036038101906101049190611167565b61038f565b6040516101169190611259565b60405180910390f35b61013960048036038101906101349190611167565b6103bc565b6040516101469190611259565b60405180910390f35b61016960048036038101906101649190611067565b6103ec565b604051610176919061123e565b60405180910390f35b61019960048036038101906101949190611167565b610408565b6040516101a69190611259565b60405180910390f35b6101c960048036038101906101c49190611004565b61041e565b6040516101d6919061123e565b60405180910390f35b6101f960048036038101906101f49190611167565b610439565b6040516102069190611259565b60405180910390f35b61022960048036038101906102249190610fb5565b61044f565b604051610236919061123e565b60405180910390f35b610259600480360381019061025491906110de565b61046a565b604051610266919061123e565b60405180910390f35b61028960048036038101906102849190611167565b6109e9565b6040516102969190611223565b60405180910390f35b6102b960048036038101906102b49190611167565b610b00565b6040516102c69190611259565b60405180910390f35b6102e960048036038101906102e49190610f8c565b610b16565b6040516102f69190611208565b60405180910390f35b61031960048036038101906103149190611167565b610b85565b604051610326919061123e565b60405180910390f35b61034960048036038101906103449190611190565b610bd9565b6040516103569190611259565b60405180910390f35b61037960048036038101906103749190611167565b610ca5565b6040516103869190611259565b60405180910390f35b60006018603c80846103a191906112ca565b6103ab91906112ca565b6103b591906114a8565b9050919050565b60006007600462015180846103d191906112ca565b6103db9190611274565b6103e591906114a8565b9050919050565b60006103fd8686868686600061046a565b905095945050505050565b600061041382610cc6565b604001519050919050565b600061042f8585858560008061046a565b9050949350505050565b6000603c8261044891906114a8565b9050919050565b6000610461848484600080600061046a565b90509392505050565b6000806107b290505b8761ffff168161ffff1610156104ce5761048c81610b16565b156104a8576301e28500826104a19190611274565b91506104bb565b6301e13380826104b89190611274565b91505b80806104c690611422565b915050610473565b6104d6610ed7565b601f816000600c8110610512577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002019060ff16908160ff168152505061052c89610b16565b1561058357601d816001600c811061056d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002019060ff16908160ff16815250506105d1565b601c816001600c81106105bf577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002019060ff16908160ff16815250505b601f816002600c811061060d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002019060ff16908160ff1681525050601e816003600c811061065a577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002019060ff16908160ff1681525050601f816004600c81106106a7577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002019060ff16908160ff1681525050601e816005600c81106106f4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002019060ff16908160ff1681525050601f816006600c8110610741577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002019060ff16908160ff1681525050601f816007600c811061078e577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002019060ff16908160ff1681525050601e816008600c81106107db577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002019060ff16908160ff1681525050601f816009600c8110610828577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002019060ff16908160ff1681525050601e81600a600c8110610875577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002019060ff16908160ff1681525050601f81600b600c81106108c2577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002019060ff16908160ff1681525050600191505b8760ff168261ffff16101561096657806001836108f59190611355565b61ffff16600c8110610930577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002015160ff166201518061094691906112fb565b836109519190611274565b9250818061095e90611422565b9250506108d8565b60018761097391906113bd565b60ff166201518061098491906112fb565b8361098f9190611274565b92508560ff16610e106109a291906112fb565b836109ad9190611274565b92508460ff16603c6109bf91906112fb565b836109ca9190611274565b92508360ff16836109db9190611274565b925050509695505050505050565b600080600090506000806301e1338085610a0391906112ca565b6107b261ffff16610a149190611274565b9150610a256107b261ffff16610b85565b610a328361ffff16610b85565b610a3c9190611389565b9050806301e28500610a4e91906112fb565b83610a599190611274565b9250806107b283610a6a9190611355565b61ffff16610a789190611389565b6301e13380610a8791906112fb565b83610a929190611274565b92505b84831115610af557610ab2600183610aad9190611355565b610b16565b15610ace576301e2850083610ac79190611389565b9250610ae1565b6301e1338083610ade9190611389565b92505b600182610aee9190611355565b9150610a95565b819350505050919050565b6000610b0b82610cc6565b602001519050919050565b600080600483610b269190611477565b61ffff1614610b385760009050610b80565b6000606483610b479190611477565b61ffff1614610b595760019050610b80565b600061019083610b699190611477565b61ffff1614610b7b5760009050610b80565b600190505b919050565b6000600182610b949190611389565b915061019082610ba491906112ca565b606483610bb191906112ca565b600484610bbe91906112ca565b610bc89190611389565b610bd29190611274565b9050919050565b600060018360ff161480610bf0575060038360ff16145b80610bfe575060058360ff16145b80610c0c575060078360ff16145b80610c1a575060088360ff16145b80610c285750600a8360ff16145b80610c365750600c8360ff16145b15610c4457601f9050610c9f565b60048360ff161480610c59575060068360ff16145b80610c67575060098360ff16145b80610c755750600b8360ff16145b15610c8357601e9050610c9f565b610c8c82610b16565b15610c9a57601d9050610c9f565b601c90505b92915050565b6000603c8083610cb591906112ca565b610cbf91906114a8565b9050919050565b610cce610efa565b60008080610cdb856109e9565b846000019061ffff16908161ffff1681525050610cfd6107b261ffff16610b85565b610d0e856000015161ffff16610b85565b610d189190611389565b9150816301e28500610d2a91906112fb565b83610d359190611274565b9250816107b28560000151610d4a9190611355565b61ffff16610d589190611389565b6301e13380610d6791906112fb565b83610d729190611274565b92506000600191505b600c8260ff1611610df257610d94828660000151610bd9565b60ff1662015180610da591906112fb565b9050858482610db49190611274565b1115610dd15781856020019060ff16908160ff1681525050610df2565b8084610ddd9190611274565b93508180610dea9061144d565b925050610d7b565b600191505b610e0985602001518660000151610bd9565b60ff168260ff1611610e6657858462015180610e259190611274565b1115610e425781856040019060ff16908160ff1681525050610e66565b6201518084610e519190611274565b93508180610e5e9061144d565b925050610df7565b610e6f8661038f565b856060019060ff16908160ff1681525050610e8986610ca5565b856080019060ff16908160ff1681525050610ea386610439565b8560a0019060ff16908160ff1681525050610ebd866103bc565b8560c0019060ff16908160ff168152505050505050919050565b604051806101800160405280600c90602082028036833780820191505090505090565b6040518060e00160405280600061ffff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001600060ff1681525090565b600081359050610f5c81611537565b92915050565b600081359050610f718161154e565b92915050565b600081359050610f8681611565565b92915050565b600060208284031215610f9e57600080fd5b6000610fac84828501610f4d565b91505092915050565b600080600060608486031215610fca57600080fd5b6000610fd886828701610f4d565b9350506020610fe986828701610f77565b9250506040610ffa86828701610f77565b9150509250925092565b6000806000806080858703121561101a57600080fd5b600061102887828801610f4d565b945050602061103987828801610f77565b935050604061104a87828801610f77565b925050606061105b87828801610f77565b91505092959194509250565b600080600080600060a0868803121561107f57600080fd5b600061108d88828901610f4d565b955050602061109e88828901610f77565b94505060406110af88828901610f77565b93505060606110c088828901610f77565b92505060806110d188828901610f77565b9150509295509295909350565b60008060008060008060c087890312156110f757600080fd5b600061110589828a01610f4d565b965050602061111689828a01610f77565b955050604061112789828a01610f77565b945050606061113889828a01610f77565b935050608061114989828a01610f77565b92505060a061115a89828a01610f77565b9150509295509295509295565b60006020828403121561117957600080fd5b600061118784828501610f62565b91505092915050565b600080604083850312156111a357600080fd5b60006111b185828601610f77565b92505060206111c285828601610f4d565b9150509250929050565b6111d5816113f1565b82525050565b6111e4816113fd565b82525050565b6111f38161140b565b82525050565b61120281611415565b82525050565b600060208201905061121d60008301846111cc565b92915050565b600060208201905061123860008301846111db565b92915050565b600060208201905061125360008301846111ea565b92915050565b600060208201905061126e60008301846111f9565b92915050565b600061127f8261140b565b915061128a8361140b565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156112bf576112be6114d9565b5b828201905092915050565b60006112d58261140b565b91506112e08361140b565b9250826112f0576112ef611508565b5b828204905092915050565b60006113068261140b565b91506113118361140b565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561134a576113496114d9565b5b828202905092915050565b6000611360826113fd565b915061136b836113fd565b92508282101561137e5761137d6114d9565b5b828203905092915050565b60006113948261140b565b915061139f8361140b565b9250828210156113b2576113b16114d9565b5b828203905092915050565b60006113c882611415565b91506113d383611415565b9250828210156113e6576113e56114d9565b5b828203905092915050565b60008115159050919050565b600061ffff82169050919050565b6000819050919050565b600060ff82169050919050565b600061142d826113fd565b915061ffff821415611442576114416114d9565b5b600182019050919050565b600061145882611415565b915060ff82141561146c5761146b6114d9565b5b600182019050919050565b6000611482826113fd565b915061148d836113fd565b92508261149d5761149c611508565b5b828206905092915050565b60006114b38261140b565b91506114be8361140b565b9250826114ce576114cd611508565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b611540816113fd565b811461154b57600080fd5b50565b6115578161140b565b811461156257600080fd5b50565b61156e81611415565b811461157957600080fd5b5056fea2646970667358221220762fd4bb28513e66ec4827fe560802df0d913962e180200ed80aecdd7ec2cc9a64736f6c63430008000033";

export class DateTime__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<DateTime> {
    return super.deploy(overrides || {}) as Promise<DateTime>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): DateTime {
    return super.attach(address) as DateTime;
  }
  connect(signer: Signer): DateTime__factory {
    return super.connect(signer) as DateTime__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DateTimeInterface {
    return new utils.Interface(_abi) as DateTimeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DateTime {
    return new Contract(address, _abi, signerOrProvider) as DateTime;
  }
}
