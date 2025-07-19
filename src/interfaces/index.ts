
export interface Media {
  id: string;
  alt: string;
  filename: string;
  url?: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: Media;
}

export interface Category {
  id:string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: any;
  author: Author;
  category: Category;
  createdAt: string;
}

export interface PaginatedDocs<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}