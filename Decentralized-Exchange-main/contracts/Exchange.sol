// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Exchange {
    using SafeMath for uint256;

    address public admin;
    mapping(address => mapping(address => uint256)) public balances;

    event Deposit(address indexed from, address indexed token, uint256 amount);
    event Withdraw(address indexed to, address indexed token, uint256 amount);
    event Trade(address indexed sender, address indexed tokenGet, uint256 amountGet, address indexed tokenGive, uint256 amountGive);

    constructor() {
        admin = msg.sender;
    }

    function depositToken(address token, uint256 amount) external {
        require(token != address(0), "Invalid token address");
        require(amount > 0, "Invalid amount");

        require(IERC20(token).transferFrom(msg.sender, address(this), amount), "Token transfer failed");

        balances[msg.sender][token] = balances[msg.sender][token].add(amount);
        emit Deposit(msg.sender, token, amount);
    }

    function withdrawToken(address token, uint256 amount) external {
        require(token != address(0), "Invalid token address");
        require(amount > 0, "Invalid amount");
        require(balances[msg.sender][token] >= amount, "Insufficient balance");

        balances[msg.sender][token] = balances[msg.sender][token].sub(amount);
        require(IERC20(token).transfer(msg.sender, amount), "Token transfer failed");

        emit Withdraw(msg.sender, token, amount);
    }

    function trade(address tokenGet, uint256 amountGet, address tokenGive, uint256 amountGive) external {
        require(tokenGet != address(0) && tokenGive != address(0), "Invalid token address");
        require(amountGet > 0 && amountGive > 0, "Invalid amount");

        require(balances[msg.sender][tokenGive] >= amountGive, "Insufficient tokenGive balance");
        require(balances[msg.sender][tokenGet] >= amountGet, "Insufficient tokenGet balance");

        balances[msg.sender][tokenGive] = balances[msg.sender][tokenGive].sub(amountGive);
        balances[msg.sender][tokenGet] = balances[msg.sender][tokenGet].add(amountGet);

        balances[msg.sender][tokenGet] = balances[msg.sender][tokenGet].sub(amountGive);
        balances[msg.sender][tokenGive] = balances[msg.sender][tokenGive].add(amountGet);

        emit Trade(msg.sender, tokenGet, amountGet, tokenGive, amountGive);
    }
}
