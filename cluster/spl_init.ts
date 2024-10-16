import { Keypair, Connection, Commitment } from "@solana/web3.js"; 
import { createMint } from "@solana/spl-token";
import wallet from "../wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const commitment : Commitment = "confirmed";

const connection = new Connection("https://api.devnet.solana.com", commitment);

(async()=>{
    try{
        // Start here
        const mint = await createMint(
            connection,
            keypair,
            keypair.publicKey,
            null,
            6
        );
        console.log(`successflly created a mint ${mint}` );
    }catch(e){
        console.log(`something went wrong ${e}`)
    }
})();


// mint address = "29oXV5SdE3B3BLrb51Ef5HndVjuqWPGvCxxyaBtUuMRZ"


// Mint {
//     /// Optional authority used to mint new tokens. The mint authority may only
//     /// be provided during mint creation. If no mint authority is present
//     /// then the mint has a fixed supply and no further tokens may be
//     /// minted.
//     pub mint_authority: COption<Pubkey>,
//     /// Total supply of tokens.
//     pub supply: u64,
//     /// Number of base 10 digits to the right of the decimal place.
//     pub decimals: u8,
//     /// Is `true` if this structure has been initialized
//     pub is_initialized: bool,
//     /// Optional authority to freeze token accounts.
//     pub freeze_authority: COption<Pubkey>,
// }