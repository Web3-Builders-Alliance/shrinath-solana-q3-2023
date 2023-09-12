use anchor_lang::prelude::*;
use anchor_spl::token_interface::{Mint, TokenInterface};
use std::collections::BTreeMap;

#[derive(Accounts)]
pub struct Initialise<'info> {
    #[account(mut)]
    initialiser : Signer<'info>,
}
