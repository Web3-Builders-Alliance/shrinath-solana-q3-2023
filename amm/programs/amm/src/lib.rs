use anchor_lang::prelude::*;
mod state;
mod contexts;
use contexts::*;

declare_id!("GMvPvwCAmp8tassxdCcyENrc9cRvStvop5TYA7quhtBR");

#[program]
pub mod amm {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
