use anchor_lang::prelude::*;

declare_id!("F5VheLVAwMf9QEPe7b3DbUNLTBxVuMUruqQx6W6RXLU3");

#[program]
pub mod dice_game {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
