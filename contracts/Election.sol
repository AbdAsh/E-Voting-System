// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
        string image;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint256 => Candidate) public candidates;
    // Store Candidates Count
    uint256 public candidatesCount;

    // voted event
    event votedEvent(uint256 indexed _candidateId);

    constructor() {
        addCandidate("McDonalds", "https://lassencofair.files.wordpress.com/2016/07/mcdonalds-logo.png");
        addCandidate("KFC", "https://image.similarpng.com/very-thumbnail/2020/06/kfc-logo-free-download-PNG.png");
        addCandidate("Burger King", "https://logowik.com/content/uploads/images/burger-king-new-20218389.jpg");
    }

    function addCandidate(string memory _name, string memory _image) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0, _image);
    }

    function vote(uint256 _candidateId) public {
        // require that they haven't voted before
        // require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        // voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }

    function getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory ret = new Candidate[](candidatesCount);
        for (uint256 i = 0; i < candidatesCount; i++) {
            ret[i] = candidates[i+1];
        }
        return ret;
    }

    function getCandidatesCount() public view returns (uint256) {
        uint256 ret = candidatesCount;
        return ret;
    }
}
