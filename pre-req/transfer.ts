import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
import wallet from "../wallet.json";

const from = Keypair.fromSecretKey(new Uint8Array(wallet));

const to = new PublicKey("86nzka9Vi6A989Ej2L4LXf8zdqvVkistHntq28mbv4gF");

const connection = new Connection("https://api.devnet.solana.com");

(async()=>{
    try{
        const bal =await connection.getBalance(from.publicKey);
        console.log(`balance before txn: ${bal}`);
        let txn = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey:from.publicKey,
                toPubkey:to,
                lamports:bal,
            })
        );
        txn.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        txn.feePayer = from.publicKey;
        const compiledmsg = txn.compileMessage();
        const fee = (await connection.getFeeForMessage(txn.compileMessage(),'confirmed')) || 0;
        console.log(`fees : ${fee.context}`);
        console.log(`compiled transaction message: ${compiledmsg.compiledInstructions}`)


        //clr transaction
        txn.instructions.pop();

        // txn.add(
        //     SystemProgram.transfer({
        //         fromPubkey:from.publicKey,
        //         toPubkey:to,
        //         lamports:bal-fee,
        //     })
        // );

        // const sig = await sendAndConfirmTransaction(
        //     connection,
        //     txn,
        //     [from]
        // );
    
        // console.log(`sucessful txn, https://explorer.solana.com/tx/${sig}?cluster=devnet`);

        // console.log(`balance after txn: ${bal}`);

    
    }catch(e){
        console.log(`something went wrong: ${e}`)
    }
    
})();