export const NS_BUTTON_STYLES_HOST: { [property: string]: string } = {
  '[class.fb-button-small]': `size === 'small'`,
  '[class.fb-button-medium]': `size === 'medium'`,
  '[class.fb-button-large]': `size === 'large'`,
  '[class.fb-button-rounded]': `rounded === true`,
  '[attr.disabled]': `disabled ? '': undefined`,
}
