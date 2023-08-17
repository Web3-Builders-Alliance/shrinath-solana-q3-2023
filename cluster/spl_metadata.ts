import { Commitment, Connection, Keypair, PublicKey, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import wallet from "../pre-req/wba-wallet.json";
import {createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const commitment : Commitment = "confirmed";

const connection = new Connection("https://api.devnet.solana.com", commitment);

const mint = new PublicKey("BfnBLUYWBjTwDDvkeLXMJ7VotmULsoHr88WtyZJSikhZ");

const token_metadata_program_id = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

const metadata_seeds = [
    Buffer.from("metadata"),
    token_metadata_program_id.toBuffer(),
    mint.toBuffer(),
];

const [metadata_pda, _bump] = PublicKey.findProgramAddressSync(metadata_seeds, token_metadata_program_id);

(async()=>{
    try{
        const tx = new Transaction().add(
            createCreateMetadataAccountV3Instruction({
                metadata:metadata_pda,
                mint:mint,
                mintAuthority:keypair.publicKey,
                payer:keypair.publicKey,
                updateAuthority:keypair.publicKey,
            },
            {
              createMetadataAccountArgsV3 :{
                data:{
                    name:"WBA resiquents",
                    symbol:"WBAR",
                    uri:"",
                    sellerFeeBasisPoints:0,
                    creators:null,
                    collection:null,
                    uses:null,
                },
                isMutable:false,
                collectionDetails:null,
              }  
            })
        )

        const sig = await sendAndConfirmTransaction(connection,tx,[keypair]);
        console.log(sig);
    }catch(e){
        console.log(`something went wrong ${e}`);
    }
})();