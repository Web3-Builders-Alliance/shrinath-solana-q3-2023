import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Voter } from '../target/types/voter';

describe('voter', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Voter as Program<Voter>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
