import { Keypair } from "@solana/web3.js";
// import wallet from "./dev-wallet.json";

// const dev_kp = Keypair.fromSecretKey(new Uint8Array(wallet));
// console.log(dev_kp);
// console.log(dev_kp.publicKey.toBase58());

//generate keypair
let kp = Keypair.generate();
console.log(`genrated a new solana wallet : ${kp.publicKey.toBase58()}`);
console.log(kp);