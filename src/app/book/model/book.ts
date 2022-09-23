export interface Book {
  id: number;
  author: string;
  title: string;
}

export type UpdatedBook = Omit<Book, 'id'>;

// export interface Book {
//   id: number;
//   author: Author;
//   details: BookDetails;
//   title: string;
// }
// export interface BookDetails{
//   pages: number;
// }

// export interface Author {
//   firstname:string
//   lastname:string
// }

// {
//   "id": 0,
//   "author": {
//     "firstName": "Felipe",
//     "lastName": "Coury"
//   },
//   "title": "ng-book: The Complete Guide to Angular",
//   "publishDate": "2018",
//   "details": {
//     "pages": 626
//   }
// },
// {
//   "id": 1,
//   "author": {
//     "firstName": "Douglas",
//     "lastName": "Crockford"
//   },
//   "title": "JavaScript. The Good Parts",
//   "publishDate": "2008",
//   "details": {
//     "pages": "180",
//     "language": "English",
//     "cover": "soft"
//   }
// },
// {
//   "id": 2,
//   "title": "TypeScript Quickly",
//   "author": {
//     "firstName": "Yakov",
//     "lastName": "Fain"
//   },
//   "details": {
//     "pages": 520,
//     "language": "English",
//     "cover": "soft"
//   },
//   "publishDate": "2020"
// }