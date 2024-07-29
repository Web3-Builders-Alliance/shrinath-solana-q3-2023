import wallet from "../wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://arweave.net/ZZ6KbkRmPYXNukUOv-qsNF5E2Ix-wUpSyYMPJVXeqA8"
        const metadata = {
            name: "Lewis Hamilton's Monster",
            symbol: "HAM",
            description: "Bono we're out of tyres",
            image,
            attributes: [
                {trait_type: 'Color', value: 'Ham purple'},
                {trait_type: 'Size', value: 'Ask Merc'},
                {trait_type: 'Material', value: 'Wakanda steel'},
                {trait_type: 'Magic', value: 'Yes'},
                {trait_type: 'Tyres', value: 'No'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: image
                    },
                ]
            },
            creators: []
        };
        
        const myUri = await umi.uploader.uploadJson(metadata);
        console.log("Your image URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();