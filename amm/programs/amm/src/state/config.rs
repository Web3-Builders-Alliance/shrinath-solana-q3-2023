use anchor_lang::prelude::*;

#[account]
pub struct Config {
    pub seed: u64,
    pub authority: Option<Pubkey>,
    pub mint_x: Pubkey, 
    pub mint_y: Pubkey, 
    pub fee: u16,
    pub locked: bool,
    pub auth_bump:u8,
    pub config_bump:u8,
    pub lp_bump:u8,
}

impl Config {
    pub const LEN:usize = 8 + 8 + 1 + 32*3 + 2 + 1 + 1*3;

    pub fn init (&mut self, 
        seed: u64,
        authority: Option<Pubkey>,
        mint_x: Pubkey, 
        mint_y: Pubkey, 
        fee: u16,
        auth_bump:u8,
        config_bump:u8,
        lp_bump:u8,
    ) {
        self.seed = seed;
        self.authority = authority;
        self.mint_x = mint_x;
        self.mint_y = mint_y;
        self.fee = fee;
        self.locked = false;
        self.auth_bump = auth_bump;
        self.config_bump = config_bump;
        self.lp_bump = lp_bump;
    }
}

