use anchor_lang::{error::Error, error_code};

#[error_code]
pub enum AmmError {
    #[msg("invalid fee")]
    InvalidFee,
    #[msg("invalid auth bump")]
    InvalidAuthBump,
    #[msg("invalid config bump")]
    InvalidConfigBump,
    #[msg("invalid lp bump")]
    InvalidLpBump,
    #[msg("don't have authority to update")]
    InvalidAuthority,
}