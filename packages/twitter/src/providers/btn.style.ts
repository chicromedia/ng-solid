export const NS_BUTTON_STYLES_HOST: { [property: string]: string } = {
  '[class.twitter-button-small]': `size === 'small'`,
  '[class.twitter-button-medium]': `size === 'medium'`,
  '[class.twitter-button-large]': `size === 'large'`,
  '[class.twitter-button-rounded]': `rounded === true`,
  '[attr.disabled]': `disabled ? '': undefined`,
}
