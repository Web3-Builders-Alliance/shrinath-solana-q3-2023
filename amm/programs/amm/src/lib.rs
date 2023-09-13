use anchor_lang::prelude::*;
mod state;
mod contexts;
use contexts::*;
mod errors;

declare_id!("GMvPvwCAmp8tassxdCcyENrc9cRvStvop5TYA7quhtBR");

#[program]
pub mod amm {
    use super::*;

    pub fn initialize(ctx: Context<Initialise>, 
        seed : u64,
        authority : Option<Pubkey>,
        fee : u16,
    ) -> Result<()> {
        ctx.accounts.init(seed, authority, fee, &ctx.bumps);
        Ok(())
    }
}