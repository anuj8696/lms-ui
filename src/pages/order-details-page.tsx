import React from 'react';
import axios from 'axios';
import LMSTable from '../components/book-table';
import { IOrderDetails } from '../def/domain';

interface IOrderDetailsProps {
    regNo: string;
}
interface IBookSate {
    listOfBooks: IOrderDetails[];
}

export default class OrderDetails extends React.Component<IOrderDetailsProps, IBookSate>{
    constructor(props: IOrderDetailsProps) {
        super(props);
        this.state = {
            listOfBooks: [],
        }
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

    render(): React.ReactNode {
        return (
            <>
             <h4>Here is your's all issued books</h4>
            <div style={{ overflowY: 'auto', height: '450px' }}>
                <LMSTable
                    rows={this.state.listOfBooks}
                    columns={this.orderClumns()}
                    checkboxReq={false}
                    isBookPage={false}
                />
            </div>
            </>
        );
    }
}