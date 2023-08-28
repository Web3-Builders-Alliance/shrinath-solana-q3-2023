use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod voter {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, _hash : Vec<u8>) -> ProgramResult {
        ctx.accounts.vote.votes = 0;
        ctx.accounts.vote.bump= *ctx.accounts.bump.get("vote").unwrap();
        Ok(())
    }

    pub fn upvote(Context<VoteInteraction>)-> Result<()> {
        ctx.accounts.vote.votes += 1;
        Ok(())
    }
    pub fn downvote(Context<VoteInteraction>)-> Result<()> {
        ctx.accounts.vote.votes -= 1;
        Ok(())
    }

}

#[derive(Accounts)]
#[instruction(_hash: Vec<u8>)]
pub struct Initialize<'info> {
    #[account(mut)]
    signer : Signer<'info>
    #[account(
        init,
        payer : signer,
        space : 8+8+1,
        seeds : [b"vote", _hash.as_slice().as_ref()],  
        bump,    
    )]
    vote: Account<'info,Vote>,
    system_program : Program<'info, System>,
}
#[derive(Accounts)]
#[instruction(_hash : Vec<u8>)]
pub struct VoteInteraction<'info> {
    #[account(mut)]
    signer : Signer<'info>
    #[account(
        mut,
        payer : signer,
        seeds : [b"vote", _hash.as_slice().as_ref()],  
        bump = vote.bump,    
    )]
    vote: Account<'info,Vote>,
}

#[account]
pub struct Vote {
    votes : i64,
    bump : u8,
}