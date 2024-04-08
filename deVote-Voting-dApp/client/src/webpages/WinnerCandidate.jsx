import { useWeb3 } from '../provider_config/provider';
import { useState,useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import CandidateCard from "../components/CandidateCard";

function WinnerCandidate() {
    const { web3, accounts, contract } = useWeb3();
    const [winner,setWinner] = useState(null);
    useEffect(() => {
        const fetchCandidates = async () => {
          if (web3 !== null && accounts.length !== 0 && contract !== null) {
            try {
              const winnerID = await contract.methods.getWinner().call();              
            const candidate = await contract.methods.getCandidate(winnerID).call();
                const winningCandidate = {
                  id: winnerID,
                  address: candidate[0],
                  name: candidate[1],
                  voteCount: candidate[2]
              }
              setWinner(winningCandidate);
            } catch (error) {
              console.error('Error fetching candidates:', error);
              alert('An error occurred while fetching candidates. Please try again.');
            }
          } else {
            console.log('MetaMask not installed or contracts not loaded.');
          }
        };
      
        fetchCandidates();
      }, [web3, accounts, contract]);
      
   

    return(
        <div className="min-h-full">
        <NavigationBar/>      
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Winner Candidate🎉</h1>
          </div>
        </header>
        <main>
  <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 grid grid-cols-3 gap-4 sm:grid-cols-1 xs:grid-cols-1 md:grid-cols-3">
  {winner && <CandidateCard key={winner.id} candidate={winner} />
              }
  </div>
</main>


      </div>
        
    )
    
}

export default WinnerCandidate;