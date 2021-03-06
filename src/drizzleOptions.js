import Election from "../build/contracts/Election.json";
const options = {
    web3: {
        block: false,
        fallback: {
            type: "ws",
            url: "ws://127.0.0.1:7545"
        }
    },
    // The contracts to monitor
    contracts: [Election],
    events: {
        Election: ["votedEvent"]
    },
    polls: {
        // check accounts ever 15 seconds
        accounts: 15000
    }
};
export default options;