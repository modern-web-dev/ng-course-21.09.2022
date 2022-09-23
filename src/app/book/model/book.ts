export interface Book {
  id: number;
  author: Author;
  details: BookDetails;
  title: string;
}
export interface BookDetails{
  pages: number;
}

export interface Author {
  firstName:string
  lastName:string
}

export type UpdatedBook = Omit<Book, 'id'>;
