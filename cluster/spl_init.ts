import { Keypair, Connection, Commitment } from "@solana/web3.js"; 
import { createMint } from "@solana/spl-token";
import wallet from "../wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const commitment : Commitment = "confirmed";

const connection = new Connection("https://api.devnet.solana.com", commitment);

(async()=>{
    try{
        const mint = await createMint(
            connection,
            keypair,
            keypair.publicKey,
            null,
            6
        );
         console.log(`successfully created a mint acc,\n mint address: ${mint}`);
    }catch(e){
        console.log(`something went wrong ${e}`)
    }
})();


// mint address = "DZJzMKPgnhzjHm42DE4TphdjM5uYyywnqeQA2fVjge9f"