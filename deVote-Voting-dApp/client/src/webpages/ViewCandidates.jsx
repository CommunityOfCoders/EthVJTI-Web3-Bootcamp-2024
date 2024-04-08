import {useState,useEffect} from 'react'

import { useWeb3 } from '../provider_config/provider';
import CandidateCard from '../components/CandidateCard'
import NavigationBar from '../components/NavigationBar';

// const user = {
//   name: 'Tom Cook',
//   email: 'tom@example.com',
//   imageUrl:
//     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// }
export const navigation = [
  
  { name: 'Home', href: '/', current: false },
  { name: 'Candidates', href: '/view', current: true },
  { name: 'Add Candidate', href: '/add', current: false },
  { name: 'Check Winner', href: '/winner', current: false },
]
// const userNavigation = [
//   { name: 'Your Profile', href: '#' },
//   { name: 'Settings', href: '#' },
//   { name: 'Sign out', href: '#' },
// ]

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

export default function ViewCandidates() {

    const [candidates, setCandidates] = useState(null);
    const { web3, accounts, contract } = useWeb3();

    useEffect(() => {
      const fetchCandidates = async () => {
        if (web3 !== null && accounts.length !== 0 && contract !== null) {
          try {
            // console.log("My address: ",accounts[0]);
            const candidatesCount = parseInt(await contract.methods.getCandidateCount().call());
            // console.log("Count of Candidates: ",candidatesCount);
            const candidatesArray = [];
            for (let i = 1; i <= candidatesCount; i++) {
              const candidate = await contract.methods.getCandidate(i).call();
              candidatesArray.push({
                id: i,
                address: candidate[0],
                name: candidate[1],
                voteCount: candidate[2]
              });
            }
            setCandidates(candidatesArray);
            // console.log(candidatesArray);
          } catch (error) {
            console.error('Error initializing Web3:', error);
            alert(
              'An error occurred while initializing Web3. Please make sure you have MetaMask installed and try again.'
            );
          }
        } else {
          console.log(' ');
        }
      };
  
      fetchCandidates();
    }, [web3, accounts, contract]);
    
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <NavigationBar/>      
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">All Candidates</h1>
          </div>
        </header>
        <main>
  <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 grid grid-cols-3 gap-4 sm:grid-cols-1 xs:grid-cols-1 md:grid-cols-3">
  {candidates &&
              candidates.map(candidate => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
  </div>
</main>


      </div>
    </>
  )
}
