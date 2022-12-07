export interface RequestsQueryParamsDto {
    limit?: number,
    page?: number,
    query?: RequestsQuery,
    order?: string,
}

export interface RequestsQuery {
    search?: string;
    deputat_id?: number;
    user_id?: number;
    frequent?: boolean;
    moderated?: boolean;
    approved?: boolean;
}