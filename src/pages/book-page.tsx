import React from 'react';
import axios from 'axios';
import { Box, Button, Grid, Link } from '@mui/material';
import LMSTable from '../components/book-table';
import { IBookData, IBookDetails } from '../def/domain';

interface IBookProps {
    regNo: string;
    pageHandler: (isSignInPage: boolean) => void;
}
interface IBookSate {
    listOfBooks: IBookDetails[];
    itemsIds: string[];
    orderedStatus: string;
}

export default class Book extends React.Component<IBookProps, IBookSate>{
    constructor(props: IBookProps) {
        super(props);
        this.state = {
            listOfBooks: [],
            itemsIds: [],
            orderedStatus: '',
        }
        this.sendSelectedItems = this.sendSelectedItems.bind(this);
        this.orderForBookIssue = this.orderForBookIssue.bind(this);
    }

    async componentDidMount() {
        const url = `${'https://nit-jsr-lms-service.herokuapp.com/listOfBooks'}`;
        const headers = {
            "Content-Type": "application/json",
            //"authorization" ""
        }
        axios.get(url, {
            headers: headers,
        })
            .then((response) => {
                if (response && response.data) {
                    this.setState({ listOfBooks: response.data });
                }
            })
            .catch((error) => {
                this.setState({ listOfBooks: [] });
            });
    }

    bookClumns() {
        const colm = [
            "Book ID",
            "Book Name",
            "Author",
            "Category"
        ];
        return colm;
    }

    sendSelectedItems(ids: string[]) {
        this.setState({ itemsIds: ids, orderedStatus: '' });
    }

    orderForBookIssue() {
        const url = `${'https://nit-jsr-lms-service.herokuapp.com/issueBoook'}`;
        const headers = {
            "Content-Type": "application/json",
            //"authorization" ""
        }
        const issueBookData: IBookData = {} as IBookData;
        issueBookData.regNo = this.props.regNo;
        issueBookData.bookId = this.state.itemsIds;
        axios.post(url, JSON.stringify(issueBookData), {
            headers: headers,
        })
            .then((response) => {
                if (response && response.data) {
                    this.setState({ orderedStatus: response.data.message });
                }
            })
            .catch((error) => {
                this.setState({ orderedStatus: 'Failed to issue the selected books' });
            });
    }

    render(): React.ReactNode {
        return (
            <div>
                <h4>Here is the list of all available books in library, Please select and click Issue Books for Issueing the books</h4>
                <div style={{ overflowY: 'auto', height: '450px' }}>
                    <LMSTable
                        rows={this.state.listOfBooks}
                        columns={this.bookClumns()}
                        checkboxReq={true}
                        isBookPage={true}
                        sendSelectedItems={this.sendSelectedItems}
                    />
                </div>
                <h3 style={{ marginTop: '50px', marginLeft: '330px', color: 'green' }}>{this.state.orderedStatus}</h3>
                <Button variant="contained" style={{ marginTop: '10px', marginLeft: '430px' }} onClick={this.orderForBookIssue}>Issue Books</Button>
            </div>
        );
    }
}