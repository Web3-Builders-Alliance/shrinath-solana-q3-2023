import { Keypair } from "@solana/web3.js";

//generate keypair
let kp = Keypair.generate();
console.log(`genrated a new solana wallet : ${kp.publicKey.toBase58()}`);
console.log(kp);