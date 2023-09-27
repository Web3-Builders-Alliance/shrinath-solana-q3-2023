use crate::{errors::AmmError, state::Config};
use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{Mint, TokenInterface}, token::TokenAccount,
};
use std::collections::BTreeMap;

#[derive(Accounts)]

pub struct Deposit<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    
}