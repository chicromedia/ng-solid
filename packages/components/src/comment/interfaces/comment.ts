export interface IComment
{
  id?: number;
  cover: {
    url: string;
    alt?: string;
  };
  message: string;
  date?: string;
  author: {
    name: string;
    link?: string;
  }
}
