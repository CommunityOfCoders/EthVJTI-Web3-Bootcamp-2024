import NavigationBar from "../components/NavigationBar";
import { useEffect, useState } from "react";
import { Button, Checkbox, Label, Modal, TextInput,Spinner } from "flowbite-react";
import { contractAddress } from '../contract_data/contract_address';
import { useWeb3 } from '../provider_config/provider';



function AddCandidate() {
    const [walletAddress, setWalletAddress] = useState('');
    const [name, setName] = useState('');
    const { web3, accounts, contract } = useWeb3();
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [contentMessage,setContentMessage] = useState('Adding Candidate');

    useEffect(()=>{
        
        if(accounts[0]==='0x32a284edD4c20ed24a3A7f33bAc8B269030cE111'){
            setOpenModal(true);
        }
    },[accounts])

    function LoadingComponent() {
        return (
            <div className="flex flex-row gap-3">
            
            <>
                <Spinner aria-label="Alternate spinner button example" size="xl" />
                <span className="pl-3">{contentMessage}</span>
            </>
            </div>
            );
        }

    const createCandidate = async () => {
  
        try {
            setLoading(true);
          const txObject = {
            from: accounts[0],
            to: contractAddress,
            data: contract.methods.addCandidate(name,walletAddress).encodeABI(),        
            gas: 2000000, // Specify your desired gas limit
          };
          const txHash = await web3.eth.sendTransaction(txObject);
          console.log(txHash);
         setContentMessage("Candidate Created Successfully!");;
          
        } catch (error) {
          setContentMessage(`There was an error adding this candidate! ${error.message}`);
          alert("There was an error!");
        }
        setTimeout(() => {
            setLoading(false);
            setOpenModal(false);
          }, 5000); // 5000 milliseconds = 5 seconds
      };


    return(
        <>
        <NavigationBar/>
        <Modal show={openModal} size="md" popup>
        <Modal.Header />
        <Modal.Body>
            {loading?<LoadingComponent/>:<div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add the Candidate Details</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="walletAddress" value="Candidate's Wallet Address" />
              </div>
              <TextInput
                id="walletAddress"
                placeholder="Ox12abc.."
                value={walletAddress}
                onChange={(event) => setWalletAddress(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Candidate's Name" />
              </div>
              <TextInput
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">The information added is true to my knowledge</Label>
              </div>
              {/* <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                Lost Password?
              </a> */}
            </div>
            <div className="w-full">
              <Button onClick={createCandidate}>Add Candidate</Button>
            </div>
            {/* <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">
                Create account
              </a>
            </div> */}
          </div>}
          
        </Modal.Body>
      </Modal>
      <Modal show={!openModal}  size="md" popup>
      <Modal.Header className="bg-yellow-200">
            Access Restricted!
        </Modal.Header>
        <Modal.Body className="bg-yellow-200">
        <span className="font-medium">This page is accessible only to administrators.</span> Try signing in with a different account.

        </Modal.Body>
      </Modal>
      


        
        </>
        
        
    )
    
}

export default AddCandidate;