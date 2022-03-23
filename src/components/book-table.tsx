import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IBookDetails } from '../def/domain';
import { Checkbox } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface ITableProps {
  rows: any;
  columns: any;
  checkboxReq?: boolean;
  sendSelectedItems?: (itemIds: string[]) => void;
}
interface ITableState {
  selectedItemIds: string[],
}

export default class CustomizedTables extends React.Component<ITableProps, ITableState>{
  constructor(props: ITableProps) {
    super(props);
    this.state = {
      selectedItemIds: [],
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, checked } = event.target;
    const itemIds = [...this.state.selectedItemIds];
    if (checked) {
      itemIds.push(id);
    }
    else {
      const indexToRemove = itemIds.indexOf(id);
      itemIds.splice(indexToRemove, 1);
    }
    this.setState({ selectedItemIds: itemIds });
    if (this.props.sendSelectedItems) {
      this.props.sendSelectedItems(itemIds);
    }
  };

  render(): React.ReactNode {
    console.log('event', this.state.selectedItemIds);
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {
                this.props.checkboxReq && <StyledTableCell>{"Select"}</StyledTableCell>
              }
              <StyledTableCell>{this.props.columns[0]}</StyledTableCell>
              <StyledTableCell>{this.props.columns[1]}</StyledTableCell>
              <StyledTableCell>{this.props.columns[2]}</StyledTableCell>
              <StyledTableCell>{this.props.columns[3]}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.rows.map((row: IBookDetails) => (
              <StyledTableRow key={row.bookId}>
                {
                  this.props.checkboxReq &&
                  <Checkbox
                    id={row.bookId}
                    onChange={this.handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                <StyledTableCell component="th" scope="row">
                  {row.bookId}
                </StyledTableCell>
                <StyledTableCell >{row.bookName}</StyledTableCell>
                <StyledTableCell>{row.author}</StyledTableCell>
                <StyledTableCell>{row.category}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
