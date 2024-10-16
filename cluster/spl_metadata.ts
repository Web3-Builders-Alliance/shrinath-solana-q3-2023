// import { Commitment, Connection, Keypair, PublicKey, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import wallet from "../wallet.json";

// import {createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

// const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// const commitment : Commitment = "confirmed";

// const connection = new Connection("https://api.devnet.solana.com", commitment);

// const mint = new PublicKey("BfnBLUYWBjTwDDvkeLXMJ7VotmULsoHr88WtyZJSikhZ");

// const token_metadata_program_id = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

// const metadata_seeds = [
//     Buffer.from("metadata"),
//     token_metadata_program_id.toBuffer(),
//     mint.toBuffer(),
// ];

// const [metadata_pda, _bump] = PublicKey.findProgramAddressSync(metadata_seeds, token_metadata_program_id);

// (async()=>{
//     try{
//         const tx = new Transaction().add(
//             createCreateMetadataAccountV3Instruction({
//                 metadata:metadata_pda,
//                 mint:mint,
//                 mintAuthority:keypair.publicKey,
//                 payer:keypair.publicKey,
//                 updateAuthority:keypair.publicKey,
//             },
//             {
//               createMetadataAccountArgsV3 :{
//                 data:{
//                     name:"WBA resiquents",
//                     symbol:"WBAR",
//                     uri:"",
//                     sellerFeeBasisPoints:0,
//                     creators:null,
//                     collection:null,
//                     uses:null,
//                 },
//                 isMutable:false,
//                 collectionDetails:null,
//               }  
//             })
//         )

//         const sig = await sendAndConfirmTransaction(connection,tx,[keypair]);
//         console.log(sig);
//     }catch(e){
//         console.log(`something went wrong ${e}`);
//     }
// })();


import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args,

} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { sign } from "crypto";

// Define our Mint address
const mint = publicKey("HuNqDTwj7WUTM1MKAJAEskrHaCuyrhHsXeTGKeA9EFc3")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            mint,
            mintAuthority:signer
        }

        let data: DataV2Args = {
            name: "resiquents",
            symbol: "hehe",
            uri:"",
            sellerFeeBasisPoints: 0,
            creators:null,
            collection:null,
            uses: null
        }

        let args: CreateMetadataAccountV3InstructionArgs = {
            data: data,
            isMutable: true,
            collectionDetails: null
        }

        let tx = createMetadataAccountV3(
            umi,
            {
                ...accounts,
                ...args
            }
        )

        let result = await tx.sendAndConfirm(umi);
        console.log(bs58.encode(result.signature));
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();