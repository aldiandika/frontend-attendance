import { Helmet } from "react-helmet";
import Navbar from "../components/navbar";
import React from 'react';
import Sidebar from "../components/sidebar";
import urls from "../__mocks/urls";
import axios from 'axios';
import { Redirect, Route } from "react-router";
import {
  Box
} from '@mui/material';
import UserInfoTable from "../components/user_info_table";


class Dashboard extends React.Component {
  state = {
    userInfo: {},
    usersData: {},
    isMobileNavOpen: false,
    isLoggedIn: true
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    axios({
      method: "get",
      url: urls.user_info,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + token
      }
    }).then(
      res => {
        const dataRequester = res.data.requester;
        const usersDataBulk = res.data.message;
        console.log(dataRequester);
        this.setState({
          userInfo: dataRequester,
          usersData: usersDataBulk
        });
      }
    ).catch(
      err => {
        console.log(err)
        this.setState({ isLoggedIn: false })
      }
    )
  }

  render() {

    return (
      <Route
        render={() => this.state.isLoggedIn ? (
          <>
            <Helmet>
              <title>Login | Aplikasi Kehadiran Divusi</title>
            </Helmet>
            <Navbar onMobileNavOpen={() => this.setState({ isMobileNavOpen: true })} />
            <Sidebar
              onMobileClose={() => this.setState({ isMobileNavOpen: false })}
              openMobile={this.state.isMobileNavOpen}
              user={this.state.userInfo}
            />

            {this.state.userInfo.role === 'admin' ? (
              <>
                <Box
                  sx={{
                    paddingTop: 10,
                    height: '200vh',
                    backgroundColor: 'background.default',
                    overflow: 'scroll'
                  }}
                  paddingLeft={{ xs: 2, sm: 4, md: 34, lg: 34 }}
                  paddingRight={2}
                >
                  <UserInfoTable
                    usersData={this.state.usersData}
                  />
                </Box>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    paddingTop: "3em"
                  }}
                >
                  Bukan admin
                </Box>
              </>
            )}


          </>
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )}
      />
    )
  }
}

export default Dashboard;