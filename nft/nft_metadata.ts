// image URI =  https://2nubsue4krykjjvaaviqsykkcjhvmxsbo5yvma3gnj2nbwuxlzoa.arweave.net/02gZUJxUcKSmoAVRCWFKEk9WXkF3cVYDZmp00NqXXlw

import { Keypair,Connection, Commitment } from "@solana/web3.js";
import { Metaplex, keypairIdentity, bundlrStorage} from "@metaplex-foundation/js";
import wallet from "../pre-req/wba-wallet.json";

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
    try {
        const {uri, metadata} =await metaplex
        .nfts()
        .uploadMetadata({
            name: "resiquents generug",
            description: "this is generug img created by dean's rug generator",
            image: "https://2nubsue4krykjjvaaviqsykkcjhvmxsbo5yvma3gnj2nbwuxlzoa.arweave.net/02gZUJxUcKSmoAVRCWFKEk9WXkF3cVYDZmp00NqXXlw",
        });
        console.log(`successfully created metadata :\n
         **uri**\n${uri}\n
         **metadata**\n${metadata}`);

    } catch (error) {
        console.log(`something went wrong : ${error}`)
    }
})();


// metadata URI = https://arweave.net/giuyRgVvsd3CdMfbYEpxHFlfoeiokAhwLZJDKu_QwAc