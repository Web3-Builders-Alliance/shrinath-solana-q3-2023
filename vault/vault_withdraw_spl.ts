import { Connection, Keypair, SystemProgram, PublicKey, Commitment, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Program, Wallet,AnchorProvider, Address, BN} from "@project-serum/anchor";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { WbaVault, IDL } from "../pre-req/programs/wba_vault";
import wallet from "../pre-req/wba-wallet.json";

const commitment : Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com",commitment);
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const vault_state = new PublicKey("6apFVHigfomrrKkTG13SxkgNjVdddKJCKCaddJbynVjH");
const provider = new AnchorProvider(connection, new Wallet(keypair), {commitment});
const program = new Program<WbaVault>(IDL, "D51uEDHLbWAxNfodfQDv7qkp8WZtxrhi3uganGbNos7o",provider);
const vaultAuth = PublicKey.findProgramAddressSync([Buffer.from("auth"),vault_state.toBuffer()],program.programId)[0];
const mint = new PublicKey("BfnBLUYWBjTwDDvkeLXMJ7VotmULsoHr88WtyZJSikhZ");
const token_decimals = 1_000_000;


(async()=>{
    try{
        const ownerAta =await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
        console.log(ownerAta.address);
        const vaultAta = await getOrCreateAssociatedTokenAccount(connection, keypair,mint,vaultAuth,true);
        
        const tx = await program.methods.withdrawSpl(new BN(token_decimals))
        .accounts({
                owner:keypair.publicKey,
                vaultState:vault_state,
                vaultAuth:vaultAuth,
                systemProgram: SystemProgram.programId,
                ownerAta:ownerAta.address,
                vaultAta:vaultAta.address,
                tokenMint:mint,
            })
        .signers([keypair]).rpc();

        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${tx}?cluster=devnet`);
    }catch(e){
        console.error(`something went wrong ${e}`);
    }
})();