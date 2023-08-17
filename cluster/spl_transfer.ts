import { Commitment, Connection, Keypair, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "../pre-req/wba-wallet.json";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const commitment : Commitment = "confirmed";

const connection = new Connection("https://api.devnet.solana.com", commitment);

const mint = new PublicKey("BfnBLUYWBjTwDDvkeLXMJ7VotmULsoHr88WtyZJSikhZ");

const to = new PublicKey("86nzka9Vi6A989Ej2L4LXf8zdqvVkistHntq28mbv4gF");

const token_decimals = 1_000_000;

(async()=>{
    try{
        const ata_from = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
        const ata_to = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to);
        const tx = await transfer(connection,keypair, ata_from.address, ata_to.address,keypair.publicKey,10*token_decimals);
        console.log(tx);
    }catch(e){
        console.error(`Oops, something went wrong: ${e}`);
    }
})();