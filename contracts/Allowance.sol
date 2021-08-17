// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Allowance {
    IERC20 public currency;

    constructor(IERC20 token) {
        currency = token;
    }

    struct Job {
        address boss;
        Employee[] employees;
        uint256 balance;
    }

    struct Employee {
        address boss;
        string name;
        string position;
        address _address;
        bool employed;
        uint256 salary;
        uint256 paymentDate;
        uint256 balance;
        uint256 oldBalance;
    }

    mapping(address => Job) public job;
    mapping(address => Employee) public employee;

    modifier unemployed(address _address) {
        require(
            employee[_address].employed == false,
            "this person already has a job"
        );
        _;
    }

    modifier employed(address _address) {
        require(
            employee[_address].employed == true,
            "this person is not employed"
        );
        require(
            employee[_address].boss == msg.sender,
            "this person do not works for you"
        );
        _;
    }

    modifier hasEmployees() {
        bool _hasEmployees = false;

        if (job[msg.sender].employees.length > 0) {
            for (uint256 i = 0; i < job[msg.sender].employees.length; i++) {
                if (
                    job[msg.sender].employees[i].employed &&
                    job[msg.sender].employees[i].boss == msg.sender
                ) {
                    _hasEmployees = true;
                    break;
                }
            }
        }

        require(_hasEmployees == true, "Nobody works in your company");
        _;
    }

    function hire(
        address _address,
        string memory _name,
        string memory _position,
        uint256 _salary
    ) external unemployed(_address) {
        require(msg.sender != _address, "You, can't hire yourself");

        job[msg.sender].boss = msg.sender;

        employee[_address].employed = true;
        employee[_address].name = _name;
        employee[_address].position = _position;
        employee[_address]._address = _address;
        employee[_address].boss = msg.sender;
        employee[_address].salary = _salary;

        job[msg.sender].employees.push(employee[_address]);
    }

    function fire(address _address) external employed(_address) {
        require(
            msg.sender != _address,
            "You, can't fire yourself, wait... how do you get hired?"
        );

        employee[_address].oldBalance += employee[_address].balance;
        employee[_address].balance = 0;
        employee[_address].employed = false;
    }

    function payEmployee(address _address) external employed(_address) {
        require(
            (employee[_address].paymentDate == 0 ||
                employee[_address].paymentDate < (block.timestamp - 30 days)),
            "You alread paid in the last 30 days"
        );

        uint256 allowance = currency.allowance(msg.sender, address(this));
        require(
            allowance >= employee[_address].salary,
            "You not allowed this amount"
        );

        employee[_address].paymentDate = block.timestamp;
        employee[_address].balance += employee[_address].salary;

        currency.transferFrom(
            msg.sender,
            address(this),
            employee[_address].salary
        );
    }

    function withdrawAll() external {
        uint256 balance = employee[msg.sender].oldBalance +
            employee[msg.sender].balance;
        require(balance > 0, "You are broke!");

        employee[msg.sender].oldBalance = 0;
        employee[msg.sender].balance = 0;

        currency.transfer(msg.sender, balance);
    }

    function sharedBonusDeposit(uint256 _amount) external hasEmployees {
        require(
            job[msg.sender].employees.length > 0,
            "Job must have at least one employee"
        );
        require(_amount > 0, "amount must be greater than 0");
        uint256 allowance = currency.allowance(msg.sender, address(this));
        require(allowance >= _amount, "You not allowed this amount");

        currency.transferFrom(msg.sender, address(this), _amount);

        address[] storage valid_employees;
        uint number_of_employees;

        for (uint256 i = 0; i < job[msg.sender].employees.length; i++) {
            if (
                job[msg.sender].employees[i].employed &&
                job[msg.sender].employees[i].boss == msg.sender
            ) {
      
                valid_employees[number_of_employees] = job[msg.sender].employees[i]._address;
                number_of_employees++;
            }
        }

        if (number_of_employees > 0) {
            uint256 bonus = (_amount + job[msg.sender].balance) / number_of_employees;
            uint256 remaining_balance = (_amount + job[msg.sender].balance) - (bonus * number_of_employees);

            job[msg.sender].balance = remaining_balance;

            for (uint256 i = 0; i < number_of_employees; i++) {
                employee[valid_employees[i]].balance += bonus;
            }

        } else {
            job[msg.sender].balance+= _amount;
        }
    }
}
