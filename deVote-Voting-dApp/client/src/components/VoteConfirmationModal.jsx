

import { Button, Modal,Spinner} from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { contractAddress } from '../contract_data/contract_address';
import { useWeb3 } from '../provider_config/provider';






function VoteConfirmationModal({candidateID}) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage,setAlertMessage] = useState('Are you sure you want to vote for this Candidate?');
  const { web3, accounts, contract } = useWeb3();
  
  function LoadingComponent() {
    return (
        <div className="flex flex-row gap-3">
        
        <>
            <Spinner aria-label="Alternate spinner button example" size="xl" />
            <span className="pl-3">{alertMessage}</span>
        </>
        </div>
        );
    }

  const handleVoteButtonClick = async () => {
    setLoading(true);
    setAlertMessage("Casting your Vote...");
    await castVote();
    setTimeout(() => {
        setLoading(false);
        setOpenModal(false);
      }, 5000); // 5000 milliseconds = 5 seconds
  };

  const castVote = async () => {
    try {

      const txObject = {
        from: accounts[0],
        to: contractAddress,
        data: contract.methods.castVote(candidateID).encodeABI(),        
        gas: 2000000, // Specify your desired gas limit
      };
      const txHash = await web3.eth.sendTransaction(txObject);
      console.log(txHash);
      setAlertMessage("Vote Cast Successfully!");
      
    } catch (error) {
        const errorMessage = error.message.split(':')[2];
        setAlertMessage(`You were unable to cast your vote because ${errorMessage}`);
             
      
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Cast Vote</Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        Are you sure you want to vote for this Candidate?
      </h3>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="flex justify-center gap-4">
          <Button color="success" onClick={handleVoteButtonClick}>
            {"Yes, I'm sure"}
          </Button>
          <Button color="failure" onClick={() => setOpenModal(false)}>
            No, cancel
          </Button>
        </div>
      )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default VoteConfirmationModal;