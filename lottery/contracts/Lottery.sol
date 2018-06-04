pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender; // global variable
    }

    function enter() public payable {
        require(msg.value > .01 ether); // a way to declare wei

        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
    }

    modifier restricted() { // we can call it whatever we want
        require(msg.sender == manager);
        _; // The undescore is where your code will be copied and pasted to
        // So, lines 22 to 24 of the pickWinner function for example
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }
}
