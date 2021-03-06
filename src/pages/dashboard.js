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
import AttendanceTable from "../components/attendance_table";
import SelfAttendanceTable from "../components/self_attendance_table";


class Dashboard extends React.Component {
  state = {
    userInfo: {},
    usersData: {},
    attendData: [],
    selfAttendData: [],
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

    axios({
      method: "get",
      url: urls.get_att,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + token
      }
    }).then(
      res => {
        const attDataBulk = res.data.message;
        const selfAttBulk = res.data.self_attendance;
        this.setState({
          attendData: attDataBulk,
          selfAttendData: selfAttBulk,
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
    const logoutFun = () => {
      const token = localStorage.getItem('token');

      const dataToken = {
        'token': token
      }
      axios({
        method: "post",
        url: urls.logout,
        data: dataToken,
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Authorization': 'Bearer ' + token
        }
      }).then(
        res => {
          console.log(res);
          if (res.data.success) {
            this.setState({ isLoggedIn: false })
          }
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    }

    const downloadRecFun = () => {
      const token = localStorage.getItem('token');

      const dataToken = {
        'token': token
      }
      axios({
        method: "get",
        url: urls.get_csv,
        data: dataToken,
        responseType: 'blob',
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'text/csv'
        }
      }).then(
        res => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'FileRecordPegawai.csv');
          document.body.appendChild(link);
          link.click();
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    }

    return (
      <Route
        render={() => this.state.isLoggedIn ? (
          <>
            <Helmet>
              <title>Dashboard | Aplikasi Kehadiran Divusi</title>
            </Helmet>
            <Navbar onMobileNavOpen={() => this.setState({ isMobileNavOpen: true })} />
            <Sidebar
              onMobileClose={() => this.setState({ isMobileNavOpen: false })}
              openMobile={this.state.isMobileNavOpen}
              user={this.state.userInfo}
              logoutFun={logoutFun}
              downloadRecFun={downloadRecFun}
            />

            {this.state.userInfo.role === 'admin' ? (
              <>
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
                  <SelfAttendanceTable
                    userName={this.state.userInfo.nama_pegawai}
                    selfAttendanceData={this.state.selfAttendData}
                  />
                  <br />
                  <UserInfoTable
                    usersData={this.state.usersData}
                  />
                  <br />
                  <AttendanceTable attendanceData={this.state.attendData} />
                </Box>
              </>

            ) : (
              <>
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
                  <SelfAttendanceTable
                    userName={this.state.usersData.nama_pegawai}
                    selfAttendanceData={this.state.selfAttendData}
                  />
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