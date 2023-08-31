import { Connection, Keypair, SystemProgram, PublicKey, Commitment, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Program } from '@coral-xyz/anchor';
import * as anchor from '@coral-xyz/anchor';
import { WbaVault, IDL } from "./../target/types/wba_vault";
import { BN } from "@coral-xyz/anchor";
const confirmTx = async (signature: string) => {
  const latestBlockhash = await anchor
    .getProvider()
    .connection.getLatestBlockhash();
  await anchor.getProvider().connection.confirmTransaction(
    {
      signature,
      ...latestBlockhash,
    },
    "confirmed"
  );
  return signature;
};
describe('wba-vault0', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const owner = new Keypair();
  const commitment :Commitment = "finalized";

  const programId = new PublicKey("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");
  const program = new anchor.Program<WbaVault>(IDL, programId,anchor.getProvider());
  const state = PublicKey.findProgramAddressSync([Buffer.from("state"),owner.publicKey.toBuffer()],program.programId)[0];
  const auth = PublicKey.findProgramAddressSync([Buffer.from("auth"),state.toBuffer()],program.programId)[0];
  const vault = PublicKey.findProgramAddressSync([Buffer.from("vault"),auth.toBuffer()],program.programId)[0];


  const depositAmount = new anchor.BN(1e9);
  const withdrawAmount = new anchor.BN(1e8);

  const solAmount = 10 * LAMPORTS_PER_SOL;
  it("Prefunds payer wallet with sol and spl token", async () => {
    await anchor.AnchorProvider.env().connection
      .requestAirdrop(owner.publicKey, solAmount)
      .then(confirmTx);

  });

  it("Is initialized!", async () => {
    await program.methods
      .initialize()
      .accounts({
        owner: owner.publicKey,
        auth: auth,
        vault: vault,
        state: state,
        systemProgram: SystemProgram.programId,
      })
      .signers([owner])
      .rpc()
      .then(confirmTx);

  });

})