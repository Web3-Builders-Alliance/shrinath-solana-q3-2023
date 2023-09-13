use crate::{errors::AmmError, state::Config};
use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{Mint, TokenInterface}, token::TokenAccount,
};
use std::collections::BTreeMap;

#[derive(Accounts)]
#[instruction(seed : u64)]
pub struct Initialise<'info> {
    #[account(mut)]
    pub initialiser : Signer<'info>,
    pub mint_x : InterfaceAccount<'info, Mint>,
    pub mint_y : InterfaceAccount<'info, Mint>,
    #[account(
        init,
        payer = initialiser,
        seeds = [b"lp", config.key().as_ref()],
        bump,
        mint::decimals = 6,
        mint::authority = auth
    )]
    pub mint_lp : InterfaceAccount<'info, Mint>,
    #[account(
        init_if_needed,
        payer = initialiser,
        associated_token::mint = mint_x,
        associated_token::authority = auth,
    )]
    pub vault_x : InterfaceAccount<'info, TokenAccount>,
    #[account(
        init_if_needed,
        payer = initialiser,
        associated_token::mint = mint_y,
        associated_token::authority = auth,
    )]
    pub vault_y : InterfaceAccount<'info, TokenAccount>,
    #[account(
        seeds = [b"auth", config.key().as_ref()], 
        bump
    )]
    /// CHECK: this is fine
    pub auth : UncheckedAccount<'info>,
    #[account(
        init,
        payer = initialiser,
        seeds = [b"config", initialiser.key().as_ref(), seed.to_le_bytes().as_ref()],
        bump,
        space = Config::LEN,
    )]
    pub config : Account<'info, Config>,
    
    pub token_program : Interface<'info, TokenInterface>,
    pub associated_token_program : Program<'info, AssociatedToken>,
    pub system_program : Program<'info, System>
}

impl<'info> Initialise<'info> {
    pub fn init(
        &mut self,
        seed : u64,
        has_authority : bool,
        fee : u16,
        bumps : &BTreeMap<String, u8>
    ) ->Result<()> {
        require!(fee<10000, AmmError::InvalidFee);
        let (auth_bump, config_bump, lp_bump) = (
            *bumps.get("auth").ok_or(AmmError::InvalidAuthBump)?,
            *bumps.get("config").ok_or(AmmError::InvalidAuthBump)?,
            *bumps.get("mint_lp").ok_or(AmmError::InvalidAuthBump)?,
        );
        self.config.init(
            seed, 
            has_authority, 
            self.mint_x.key(),
            self.mint_y.key(), 
            fee, 
            auth_bump, 
            config_bump, 
            lp_bump
        );
        Ok(())
    }
} 

