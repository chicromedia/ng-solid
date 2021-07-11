export interface TwitterCard
{
  title: string;
  description: string;
  card?: 'photo' | 'player' | 'summary' | 'summary with large image';
  url: string;
  image: string;
}
