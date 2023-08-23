import { Keypair,Connection, Commitment } from "@solana/web3.js";
import { Metaplex, keypairIdentity, bundlrStorage, toMetaplexFile } from "@metaplex-foundation/js";
import wallet from "../pre-req/wba-wallet.json";
import { readFile } from "fs/promises";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const commitment:Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(keypair))
    .use(bundlrStorage({
        address:'https://devnet.bundlr.network',
        providerUrl:'https://api.devnet.solana.com',
        timeout:60000,
    }));


(async()=>{
    try{
        const img = await readFile("./images/generug.png");
        const metaplexFile = toMetaplexFile(img, "generug.png");
        const imageUri = await metaplex.storage().upload(metaplexFile);

        console.log(`img has been uploaded at : ${imageUri}`);
    }catch(e){
        console.error(`something went wrong ${e}`);
    }
})();


//image uri :  https://2nubsue4krykjjvaaviqsykkcjhvmxsbo5yvma3gnj2nbwuxlzoa.arweave.net/02gZUJxUcKSmoAVRCWFKEk9WXkF3cVYDZmp00NqXXlw