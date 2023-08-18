import { Connection, Keypair, SystemProgram, PublicKey, Commitment } from "@solana/web3.js";
import { Program, Wallet,AnchorProvider, Address } from "@project-serum/anchor";
import { WbaVault, IDL } from "../pre-req/programs/wba_vault";
import wallet from "../pre-req/wba-wallet.json";

const commitment : Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com",commitment);
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const vault_state = Keypair.generate();
console.log(vault_state);
const provider = new AnchorProvider(connection, new Wallet(keypair), {commitment});
const program = new Program<WbaVault>(IDL, "D51uEDHLbWAxNfodfQDv7qkp8WZtxrhi3uganGbNos7o",provider);
const vaultAuth = PublicKey.findProgramAddressSync([Buffer.from("auth"),vault_state.publicKey.toBuffer()],program.programId)[0];
const vault = PublicKey.findProgramAddressSync([Buffer.from("vault"),vaultAuth.toBuffer()],program.programId)[0];



(async()=>{
    try{
        const tx = await program.methods.initialize()
        .accounts({
                owner:keypair.publicKey,
                vaultState:vault_state.publicKey,
                vaultAuth:vaultAuth,
                vault:vault,
            })
        .signers([keypair,vault_state]).rpc();

        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${tx}?cluster=devnet`);
    }catch(e){
        console.error(`something went wrong ${e}`);
    }
})();