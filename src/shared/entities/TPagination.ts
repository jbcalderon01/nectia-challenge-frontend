export type TPagination<T> = {
  data: T[];
  total_count: number;
  per_page: number;
  page: number;
};

export type CommonFilters = {
  pagination: {
    per_page?: number;
    page: number;
    sortBy?: string;
    sortDirection?: string;
  };
};
