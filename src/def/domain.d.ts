export interface IUserDetails {
    emailId: string,
    password: string,
    regNo: string,
}

export interface IBookDetails {
    bookId: string,
    bookName: string,
    author: string,
    category: string
}

export interface IBookData {
    regNo: string,
    bookId: string[]
}

export interface IOrderDetails {
    bookId: string,
    bookName: string,
    bookAuthor: string,
    orderdDate: string,
}