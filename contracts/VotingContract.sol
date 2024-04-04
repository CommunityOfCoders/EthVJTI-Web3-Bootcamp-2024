// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting{

    struct Candidate{
        uint256 candidateID;
        address candidateAddress;
        string candidateName;
        uint256 candidateVoteCount;
    }

    struct Voter{
        uint256 voterID;
        address voterAddress;
        bool hasVoted;
    }

    uint256 public numVoters;
    uint256 public numCandidates;
    address public administrator;

    mapping (uint256 => Candidate) public Candidates;
    mapping(address => Voter) public Voters;

    event CandidateAdded(address candidateaddr);
    event VoteCast(address voter);

    constructor(){
        administrator = msg.sender;
        numVoters = 0;
        numCandidates = 0;
    }

    function addCandidate(string memory candidatename, address candidateaddr ) public {
        require(msg.sender==administrator, "Only the Administrator can add this contract");
        require(candidateaddr != address(0), "Invalid candidate address");
        numCandidates++;

        Candidate memory newCandidate = Candidate({
            candidateID: numCandidates,
            candidateAddress: candidateaddr,
            candidateName:candidatename,
            candidateVoteCount:0
        });

        Candidates[numCandidates] = newCandidate;
        emit CandidateAdded(candidateaddr);

    }

    function castVote(uint256 candidateid) public {
        require(candidateid <= numCandidates && candidateid>0, "Invalid candidate ID!");
        require(!Voters[msg.sender].hasVoted, "You have already voted!");
        Candidates[candidateid].candidateVoteCount++;
        Voters[msg.sender].hasVoted =true;

        emit VoteCast(msg.sender);

    }

    function getCandidate(uint256 candidateid) public view returns (address,string memory,uint256) {
        require(candidateid <= numCandidates && candidateid>0, "Invalid candidate ID!");
        Candidate memory thisCandidate = Candidates[candidateid];
        return (thisCandidate.candidateAddress,thisCandidate.candidateName,thisCandidate.candidateVoteCount);
    }

    function getWinner() public view  {
        uint256 max_votes = Candidates[1].candidateVoteCount;
        uint256 winner_candidate = 1;
        for (uint256 i = 2; i <= numCandidates; i++) 
        {
            if(Candidates[i].candidateVoteCount > max_votes){
                max_votes = Candidates[i].candidateVoteCount;
                winner_candidate = i;
            }
        }
        getCandidate(winner_candidate);
    }


}
