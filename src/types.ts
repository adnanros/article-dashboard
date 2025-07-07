export interface Article {
  id: number;
  title: string;
  status: 'Draft' | 'Published';
  author: string;
  createdAt: string;
}