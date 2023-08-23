// metadata URI = https://arweave.net/giuyRgVvsd3CdMfbYEpxHFlfoeiokAhwLZJDKu_QwAc

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
        const {nft} =await metaplex
        .nfts()
        .create({
            uri:"https://arweave.net/giuyRgVvsd3CdMfbYEpxHFlfoeiokAhwLZJDKu_QwAc",
            name:"resiquents generug",
            sellerFeeBasisPoints:0,
        });
        
        console.log(`Success! Check out your NFT here:\nhttps://explorer.solana.com/address/${nft.address.toBase58()}?cluster=devnet`);

    } catch (error) {
        console.log(`something went wrong : ${error}`)
    }
})();

// mint = https://explorer.solana.com/address/GqVXkAgPrxYwucqBLL3ro5Zxhtu2TREnpCwZ1S9oSDzf/metadata?cluster=devnet
