export interface Author {
    id: number;
    name: string;
    avatar: any;
}

export type AuthorsObj = {
    [key in Author["id"]]: Author;
};

export interface IComment {
    parent: null | number;
    id: number;
    created: string;
    text: string;
    author: Author["id"];
    likes: number;
}

export interface CommentWithChildren extends IComment {
    children?: IComment[];
}

interface Pagination {
    page: number;
    size: number;
    total_pages: number;
}
export interface CommentsResponce {
    data: IComment[];
    pagination: Pagination;
}
