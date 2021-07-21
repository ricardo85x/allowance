// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Allowance {

    struct Job {
        address boss;
        Employee[] employees;
        uint balance;
    }

    struct Employee {
        address boss;
        string name;
        address _address;
        bool employed;
        uint balance;
        uint oldBalance;
    }

    mapping(address => Job) public job;
    mapping(address => Employee ) public employee;

    modifier unemployed(address _address) {
        require(employee[_address].employed == false, "this person already has a job");
        _;
    }

    modifier employed(address _address) {
        require(employee[_address].employed == true, "this person is not employed");
        require(employee[_address].boss == msg.sender, "this person do not works for you");
        _;
    }

    modifier hasEmployees() {

        bool _hasEmployees = false;

        if(job[msg.sender].employees.length > 0) {
            for(uint i = 0; i < job[msg.sender].employees.length; i++){
                if(job[msg.sender].employees[i].employed && job[msg.sender].employees[i].boss == msg.sender) {
                    _hasEmployees = true;
                    break;
                }
            }
        }

        require(_hasEmployees == true, "Nobody works in your company");
        _;
    }

    function hire(address _address, string memory _name) external unemployed(_address) {

        require(msg.sender != _address, "You, can't hire yourself");

        job[msg.sender].boss = msg.sender;

        employee[_address].employed = true;
        employee[_address].name = _name;
        employee[_address].boss = msg.sender;
        job[msg.sender].employees.push(employee[_address]);
        
    }

    function fire(address _address) external employed(_address) {
        require(msg.sender != _address, "You, can't fire yourself, wait... how do you get hired?");

        employee[_address].oldBalance +=  employee[_address].balance;
        employee[_address].balance = 0;
        employee[_address].employed = false;
    }

    function payEmployee(address _address) external payable employed(_address) {
        employee[_address].balance += msg.value;
    }

    function withdrawAll() external {
        uint balance = employee[msg.sender].oldBalance + employee[msg.sender].balance;
        require(balance > 0, "You are broke!");

        employee[msg.sender].oldBalance = 0;
        employee[msg.sender].balance = 0;

        payable(msg.sender).transfer(balance);
    }

    function sharedDeposit() external payable hasEmployees {

        address[] storage valid_employees;

        for(uint i = 0; i < job[msg.sender].employees.length; i++){
            if(job[msg.sender].employees[i].employed && job[msg.sender].employees[i].boss == msg.sender) {
                valid_employees.push(job[msg.sender].employees[i]._address);
            }
        }

        uint salary = (msg.value + job[msg.sender].balance ) / valid_employees.length;
        uint remaining_balance =  (msg.value + job[msg.sender].balance)  - (salary * valid_employees.length);

        job[msg.sender].balance = remaining_balance;

        for (uint i = 0; i < valid_employees.length ; i++){
            employee[valid_employees[i]].balance += salary; 
        }

    }








}