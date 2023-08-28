use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
mod vote_anchor {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, _hash: Vec<u8>) -> Result<()> {
        ctx.accounts.vote_account.votes = 0i64;
        ctx.accounts.vote_account.bump = *ctx.bumps.get("vote_account").unwrap();
        Ok(())
    }

    pub fn upvote(ctx: Context<VoteInteraction>, _hash: Vec<u8>) -> Result<()> {
        ctx.accounts.vote_account.votes+=1;
        Ok(())
    }

    pub fn downvote(ctx: Context<VoteInteraction>, _hash: Vec<u8>) -> Result<()> {
        ctx.accounts.vote_account.votes-=1;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(_hash: Vec<u8>)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(init, seeds = [b"vote", _hash.as_slice().as_ref()], bump, payer = owner, space = 8 + 9 + 32)]
    pub vote_account: Account<'info, Vote>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(_hash: Vec<u8>)]
pub struct VoteInteraction<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(mut, seeds = [b"vote", _hash.as_slice().as_ref()], bump = vote_account.bump)]
    pub vote_account: Account<'info, Vote>
}

#[account]
pub struct Vote {
    votes: i64,
    bump: u8
}