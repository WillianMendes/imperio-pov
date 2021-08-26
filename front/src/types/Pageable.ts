interface Pageable<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  }
  empty: boolean;
  size: number;
  totalPages: number;
  totalElements: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
}

export default Pageable;
