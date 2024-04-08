# Client
The important directories and files in the client can be understood as follows:

The `src` folder contains the source code for the client

- `contract_data` contains files for accessing the deployed contract's address and Application Binary Interface (or ABI).

- `provider_config` contains the specifications of the Injected Provider (Metamask) used in the project.

- `components` and `webpages` contain the components and webpages used in the design of the frontend.

`package.json` is used to specify the package dependencies, and `tailiwind.config.js` is specifies the congfiguration of Tailwind CSS utilized.


## Run on Local Host

1. Ensure that you have navigated to the `deVote-Voting-dApp/client` directory.
2. In the terminal, run the command `npm install` to install all the package dependencies. In case of any errors in this step, try running `npm install --legacy-peer-deps`.
3. Once the dependencies have installed successfully, run the command `npm start` to run the local host. The dApp begins running on [Local Host](http://localhost:3000/)!

Note that you cannot vote for a particular candidate using the same wallet address, and only the administrator account (i.e. the account that was used to deploy the contract) is allowed to add a candidate to the platform.

                   