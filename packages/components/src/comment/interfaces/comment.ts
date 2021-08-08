export interface IComment
{
  id?: number;
  cover: {
    url: string;
    alt?: string;
  };
  message: string;
  created?: string;
  author: {
    name: string;
    link?: string;
  }
}
