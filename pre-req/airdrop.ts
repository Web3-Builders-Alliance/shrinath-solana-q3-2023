import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";

import wallet from "./dev-wallet.json"

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com");

(async()=>{
    try{
        const txnhash = await connection.requestAirdrop(keypair.publicKey, 2*LAMPORTS_PER_SOL);
        console.log(`transaction is done, check it out at https://explorer.solana.com/tx/${txnhash}?cluster=devnet`);
    }catch(e){
        console.log(`something went wrong: ${e}`);
    }
})();
