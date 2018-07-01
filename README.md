Orbit Net
Codename for MVP Order Generation / Filling / Dashboard DApp

MetaMask
Installation
You should install MetaMask chrome extension to approve all blockchain transactions.

Account import
Open MetaMask extension.
If this is the first run, agree with terms.
Click by update cycle icon at the right left corner.
Select Import account
Paste your private key.
Local project setup
Switch working directory to react-ui.
Install app dependencies
$ yarn install
Start ngrok tunnel to your localhost in a separate terminal window
$ yarn ngrok:start
Create .env.local file in the react-ui directory.
Copy the ngrok forwarding route (it should look something like https://00434830.ngrok.io) without http:// or https:// at the beginning to .env.local file as REACT_APP_NGROK_HOSTNAME=<your_ngrok_hostname>.
Run local test chain in a separate terminal window:
$ yarn chain
Copy the first private key from the list and import it into MetaMask (see above).
Migrate contracts on to the local chain:
$ yarn contracts:migrate
If you run yarn contracts:migrate after yarn start, make sure to re-run yarn start again in order to pick up the latest networkId

Pre-populate the app with some test loans data:
$ yarn migrations:loans
Run the app in development mode:
$ yarn start
Switch MetaMask network to Localhost 8545
Kovan test network
Whether you have local instance run or deployed it somewhere you can switch to Kovan test network instead of local test chain. To do this just open MetaMask extension and select Kovan test network from the list of available networks.

Testing
Run yarn test:watch in order to watch test files changes.