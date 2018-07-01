# Orbit Net

Codename for MVP Order Generation / Filling / Dashboard DApp

## MetaMask

### Installation
You should install [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) chrome extension to approve all blockchain transactions.

### Account import

1. Open MetaMask extension.
2. If this is the first run, agree with terms.
3. Click by update cycle icon at the right left corner.
4. Select `Import account`
5. Paste your private key.

## Local project setup

1. Switch working directory to `react-ui`.
2. Install app dependencies

```
$ yarn install
```

3. Start ngrok tunnel to your localhost in a separate terminal window

```
$ yarn ngrok:start
```

4. Create `.env.local` file in the `react-ui` directory.
5. Copy the ngrok forwarding route (it should look something like `https://00434830.ngrok.io`) without `http://` or `https://` at the beginning
to `.env.local` file as `REACT_APP_NGROK_HOSTNAME=<your_ngrok_hostname>`.
6. Run local test chain in a separate terminal window:

```
$ yarn chain
```

7. Copy the first private key from the list and import it into MetaMask (see above).
8. Migrate contracts on to the local chain:

```
$ yarn contracts:migrate
```

> If you run `yarn contracts:migrate` after `yarn start`, make sure to re-run `yarn start` again in order
> to pick up the latest `networkId`

9. Pre-populate the app with some test loans data:

```
$ yarn migrations:loans
```

10. Run the app in development mode:

```
$ yarn start
```

11. Switch MetaMask network to `Localhost 8545`

## Kovan test network

Whether you have local instance run or deployed it somewhere you can switch to Kovan test network instead of local test chain.
To do this just open MetaMask extension and select `Kovan test network` from the list of available networks.

## Testing

Run `yarn test:watch` in order to watch test files changes.
