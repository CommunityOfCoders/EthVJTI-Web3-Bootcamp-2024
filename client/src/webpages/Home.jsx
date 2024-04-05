import { useState,useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Web3 from 'web3';
import { contractAddress } from '../contract_data/contract_address';
import { contractABI } from '../contract_data/contract_ABI';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [web3,setWeb3] = useState(null);
  const [contract,setContract] = useState(null);
  const [accounts,setAccounts] = useState([]);
  const [candidates, setCandidates] = useState(null);
  const [winner,setWinner] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [candidateId, setCandidateId] = useState(0);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCandidateIdChange = (event) => {
    setCandidateId(event.target.value);
  };

  useEffect(() => {
    const initialize = async () => {
      // Check if web3 is injected by the browser (Mist/MetaMask)
      if (typeof window.ethereum !== 'undefined') {
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3 = new Web3(window.ethereum);
          setWeb3(web3);

          // Get the user's accounts
          const accounts = await web3.eth.getAccounts();
          setAccounts(accounts);

          // Get the contract instance
          const contract = new web3.eth.Contract(contractABI, contractAddress);
          setContract(contract);
          console.log("My address: ",accounts[0]);
        } catch (error) {
          console.error('Error initializing Web3:', error);
          alert(
            'An error occurred while initializing Web3. Please make sure you have MetaMask installed and try again.'
          );
        }
      } else {
        console.log('Please install MetaMask!');
      }
    };

    initialize();
  }, []);

  const createCandidate = async () => {
  
    try {

      const txObject = {
        from: accounts[0],
        to: contractAddress,
        data: contract.methods.addCandidate(name,address).encodeABI(),        
        gas: 2000000, // Specify your desired gas limit
      };
      const txHash = await web3.eth.sendTransaction(txObject);
      console.log(txHash);
      console.log("Candidate Created Successfully!");;
      
    } catch (error) {
      console.error('Error:', error);
      alert("There was an error!");
    }
  };

  const castVote = async () => {
  
    try {

      const txObject = {
        from: accounts[0],
        to: contractAddress,
        data: contract.methods.castVote(1).encodeABI(),        
        gas: 2000000, // Specify your desired gas limit
      };
      const txHash = await web3.eth.sendTransaction(txObject);
      console.log(txHash);
      console.log("Vote Cast Successfully!");
      
    } catch (error) {
      console.error('Error:', error);
      alert("There was an error!");
    }
  };

  const getAllCandidates = async () => {
    try {
      const candidatesCount = parseInt(await contract.methods.getCandidateCount().call());
      console.log("Count of Candidates: ",candidatesCount);
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
      console.log(candidatesArray);
    } catch (error) {
      console.error(error);
    }
  };

  const getWinner = async () => {
    try {
      const winner = await contract.methods.getWinner().call();
      console.log(winner);
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            {/* <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a> */}
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {/* <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
          </div> */}
          {/* <div style={{marginTop:'10vh'}}className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Connect Wallet <span aria-hidden="true">&rarr;</span>
            </a>
          </div> */}
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Find out who is in the Lead.{' '}
              <button onClick={getWinner} className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Check Winner <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Empower Democracy with Blockchain Technology
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            Secure, Transparent, and Decentralized Voting Platform Harnessing the Power of Blockchain Technology to Ensure Fair and Trustworthy Elections.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button onClick={castVote} 
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cast My Vote
              </button>
              <button onClick={createCandidate}className="text-sm font-semibold leading-6 text-gray-900">
                Add Candidate <span aria-hidden="true"></span>
              </button>
              <button onClick={getAllCandidates} className="text-sm font-semibold leading-6 text-gray-900">
                View Candidates <span aria-hidden="true">→</span>
              </button>              
            </div>
            <div>
              <h3>Add Candidate Info</h3>
              <label>
                    Candidate Name:
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      required
                    />
              </label>
              <label>
          Candidate Address:
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            required
          />
        </label>
            </div>
            <div>
              <h3>Choose Candidate to vote for:</h3>
              <label>
          Candidate ID:
          <input
            type="number"
            value={candidateId}
            onChange={handleCandidateIdChange}
            required
          />
        </label>
              
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
