use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod wba_vault {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.state.state_bump = *ctx.bumps.get("state").unwrap();
        ctx.accounts.state.auth_bump = *ctx.bumps.get("auth").unwrap();
        ctx.accounts.state.vault_bump = *ctx.bumps.get("vault").unwrap();
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize <'info> {
    #[account(mut)]
    owner: Signer<'info>,
    #[account(
        init,
        payer = owner,
        space = VaultState::LEN,
        seeds = [b"state", owner.key().as_ref()],
        bump,
    )]
    state : Account<'info, VaultState>,
    #[account(
        seeds = [b"auth", state.key().as_ref()],
        bump
    )]
    auth : UncheckedAccount<'info>,
    #[account(
        seeds = [b"vault", state.key().as_ref()],
        bump
    )]
    vault : SystemAccount<'info>,
    system_program : Program<'info,System>,

}

#[account]

pub struct VaultState {
    state_bump : u8,
    auth_bump : u8,
    vault_bump : u8,
}

impl VaultState {
    const LEN : usize = 8 + 1*3;
}