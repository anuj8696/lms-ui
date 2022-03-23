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
        const url = `${'http://localhost:8080/getIssueBook/'}${this.props.regNo}`;
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
            "Book Name",
            "Issued Date",
            "Return Date"
        ];
        return colm;
    }

    render(): React.ReactNode {
        return (
            <div style={{ overflowY: 'auto', height: '450px' }}>
                <LMSTable
                    rows={this.state.listOfBooks}
                    columns={this.orderClumns()}
                    checkboxReq={false}
                />
            </div>
        );
    }
}