import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { WbaVault } from '../target/types/wba_vault';

describe('wba_vault', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.WbaVault as Program<WbaVault>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
