export interface TwitterCard
{
  title: string;
  description: string;
  card?: 'photo' | 'player' | 'summary' | 'summary_large_image';
  type?: string;
  site: string
  image: string;
  'image:alt'?: string;
}
