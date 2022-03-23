import React from 'react';
import './App.css';
import { Box, FormControl, FormHelperText, Grid, InputLabel, ListItem, Tab, Tabs } from '@mui/material';
import SignIn from './pages/sing-in-page';
import SignUp from './pages/sign-up-page';
import { IUserDetails } from './def/domain';
import axios from 'axios';
import Book from './pages/book-page';
import OrderDetails from './pages/order-details-page';

interface IAppProps {

}
interface IAppSate {
  isSignInPage: boolean;
  isSignUpPage: boolean;
  isLoginVerified: boolean;
  regNo: string;
  password: string,
  loginFailedMsg: string;
  tabValue: number;
}

export default class App extends React.Component<IAppProps, IAppSate>{
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      isSignInPage: true,
      isSignUpPage: false,
      isLoginVerified: false,
      regNo: '',
      password: '',
      loginFailedMsg: '',
      tabValue: 0,
    }
    this.pageHandler = this.pageHandler.bind(this);
    this.verifyLoginCredentials = this.verifyLoginCredentials.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  pageHandler(isSignInPage: boolean) {
    if (isSignInPage) {
      this.setState({ isSignInPage: true, isSignUpPage: false, isLoginVerified: false });
    }
    else {
      this.setState({ isSignInPage: false, isSignUpPage: true, isLoginVerified: false });
    }

  }

  async verifyLoginCredentials(userDetails: IUserDetails) {
    this.setState({ regNo: userDetails.regNo });
    const url = `${'http://localhost:8080/resultLoggin'}${'?regNo='}${userDetails.regNo}${'&password='}${userDetails.password}`;
    const headers = {
      "Content-Type": "application/json",
      //"authorization" ""
    }
    axios.get(url, {
      headers: headers,
    })
      .then((response) => {
        if (response && response.data) {
          if (response.data.status === 200) {
            this.setState({ isLoginVerified: true, isSignInPage: false, isSignUpPage: false, loginFailedMsg: '' });
          }
          else {
            this.setState({ loginFailedMsg: response.data.message });
          }
        }
      })
      .catch((error) => {
        this.setState({ isLoginVerified: false, isSignInPage: false, isSignUpPage: false });
      });
  }

  handleChange(event: React.SyntheticEvent, newValue: number) {
    this.setState({tabValue: newValue});
  }

  render(): React.ReactNode {
    return (
      <>
        {
          this.state.isSignInPage &&
          <SignIn pageHandler={this.pageHandler} verifyLoginCredentials={this.verifyLoginCredentials} loginFailedMsg={this.state.loginFailedMsg} />
        }
        {
          this.state.isSignUpPage &&
          <SignUp pageHandler={this.pageHandler} />
        }
        {
          this.state.isLoginVerified &&
          <Box sx={{ width: '100%' }}>
            <Tabs value={this.state.tabValue}
              onChange={this.handleChange}
              centered>
              <Tab label="Issue Books" />
              <Tab label="Check Issued Books" />
              { this.state.tabValue === 0 && <Book regNo={this.state.regNo} pageHandler={this.pageHandler}/> }
              { this.state.tabValue === 1 && <OrderDetails regNo={this.state.regNo} /> }
            </Tabs>
          </Box>
  }
      </>
    );
  }

}
