export class GoogleItem
{
  id: number;
  name: string;
  brand?: string;
  category: string;
  coupon?: string;
  list_name?: string;
  list_position: number;
  price: number;
  quantity: number;
  variant?: string;

  constructor(props: Partial<GoogleItem> = {})
  {
    Object.assign(this, props)
  }
}

export interface GoogleEvent
{
  affiliation?: string;
  send_to: string,
  currency: string,
  transaction_id?: string,
  value?: number;
  event_callback?: (event: any) => void;
  items?: GoogleItem[];
  method?: string;
  checkout_option?: string;
  checkout_step?: number;
}
