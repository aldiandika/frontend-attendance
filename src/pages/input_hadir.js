import { Helmet } from "react-helmet";
import Navbar from "../components/navbar";
import React from 'react';
import Sidebar from "../components/sidebar";
import urls from "../__mocks/urls";
import axios from 'axios';
import { Redirect, Route } from "react-router";
import {
  Box,
  Card,
  Typography
} from '@mui/material';
import InputAttend from "../components/input_attend";

class InputKehadiran extends React.Component {
  state = {
    selfAttendData: [],
    isMobileNavOpen: false,
    userInfo: {},
    attendNow: {},
    permNow: {},
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
        this.setState({
          userInfo: dataRequester
        });
      }
    ).catch(
      err => {
        console.log(err)
        this.setState({ isLoggedIn: false })
      }
    )

    axios({
      method: "get",
      url: urls.get_att,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + token
      }
    }).then(
      res => {
        const selfAttBulk = res.data.self_attendance;
        console.log(selfAttBulk);
        this.setState({
          selfAttendData: selfAttBulk,
        });
      }
    ).catch(
      err => {
        console.log(err)
        this.setState({ isLoggedIn: false })
      }
    )

    axios({
      method: "get",
      url: urls.get_att_now,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + token
      }
    }).then(
      res => {
        const attNowBulk = res.data.message;
        // console.log(attNowBulk);
        this.setState({
          attendNow: attNowBulk
        });
      }
    ).catch(
      err => {
        console.log(err)
        this.setState({ isLoggedIn: false })
      }
    )

    // Get perm now
    axios({
      method: "get",
      url: urls.perm_now,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + token
      }
    }).then(
      res => {
        const dataPermNow = res.data.message;
        // console.log(dataPermNow);
        this.setState({
          permNow: dataPermNow
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
              <title>Input Kehadiran | Aplikasi Kehadiran Divusi</title>
            </Helmet>
            <Navbar onMobileNavOpen={() => this.setState({ isMobileNavOpen: true })} />
            <Sidebar
              onMobileClose={() => this.setState({ isMobileNavOpen: false })}
              openMobile={this.state.isMobileNavOpen}
              user={this.state.userInfo}
            />

            <Box
              sx={{
                paddingTop: 10,
                paddingBottom: 10,
                height: '100%',
                minHeight: '100vh',
                backgroundColor: 'background.default',
                overflow: 'scroll'
              }}
              paddingLeft={{ xs: 2, sm: 4, md: 34, lg: 34 }}
              paddingRight={2}
            >
              {this.state.permNow ? (
                <Card>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      backgroundColor: 'grey',
                      p: 2
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.5em",
                        fontWeight: 700,
                        textTransform: "capitalize",
                        fontColor: "text.primary"
                      }}
                    >
                      Anda Izin Hari Ini
                    </Typography>
                  </Box>
                </Card>
              ) : (
                <InputAttend
                  userInfo={this.state.userInfo}
                  userAttendNow={this.state.attendNow}
                />
              )}

            </Box>

          </>
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )}
      />
    )

  }
}

export default InputKehadiran;

