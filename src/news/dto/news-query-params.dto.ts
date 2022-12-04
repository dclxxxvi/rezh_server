export interface NewsQueryParamsDto {
    limit?: number,
    page?: number,
    query?: NewsQuery,
    order?: string,
}

export interface NewsQuery {
    search?: string;
}