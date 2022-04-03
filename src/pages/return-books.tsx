import React from 'react';
import axios from 'axios';
import LMSTable from '../components/book-table';
import { IBookData, IOrderDetails } from '../def/domain';
import { Button } from '@mui/material';

interface IReturnBooksProps {
    regNo: string;
}
interface IReturnBooksSate {
    listOfBooks: IOrderDetails[];
    returnStatus: string;
    itemsIds: string[];
}

export default class ReturnBooks extends React.Component<IReturnBooksProps, IReturnBooksSate>{
    constructor(props: IReturnBooksProps) {
        super(props);
        this.state = {
            listOfBooks: [],
            returnStatus: '',
            itemsIds: [],
        }

        this.sendSelectedItems = this.sendSelectedItems.bind(this);
        this.returnBooks = this.returnBooks.bind(this);
    }

    async componentDidMount() {
        const url = `${'https://nit-jsr-lms-service.herokuapp.com/getIssueBook/'}${this.props.regNo}`;
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

    orderClumns() {
        const colm = [
            "Book ID",
            "Book Name",
            "Book Author",
            "Issued Date",
        ];
        return colm;
    }

    sendSelectedItems(ids: string[]) {
        this.setState({ itemsIds: ids, returnStatus: '' });
    }

    returnBooks() {
        const url = `${'https://nit-jsr-lms-service.herokuapp.com/returnBooks'}`;
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
                    this.setState({ returnStatus: response.data.message });
                }
            })
            .catch((error) => {
                this.setState({ returnStatus: 'Failed to return the selected books' });
            });
    }

    render(): React.ReactNode {
        return (
            <>
                <h4>You can select and click Return Books to return the issued books</h4>
                <div style={{ overflowY: 'auto', height: '450px' }}>
                    <LMSTable
                        rows={this.state.listOfBooks}
                        columns={this.orderClumns()}
                        checkboxReq={true}
                        isBookPage={false}
                        sendSelectedItems={this.sendSelectedItems}
                    />
                </div>
                <h3 style={{ marginTop: '50px', marginLeft: '330px', color: 'green' }}>{this.state.returnStatus}</h3>
                <Button variant="contained" style={{ marginTop: '10px', marginLeft: '430px' }} onClick={this.returnBooks}>Return Books</Button>
            </>
        );
    }
}