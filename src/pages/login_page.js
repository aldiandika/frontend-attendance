import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import axios from 'axios';
import urls from '../__mocks/urls';
import { useState } from "react";
import { Redirect } from "react-router";

const LoginPage = () => {
  const [redirect, setRedirect] = useState(false);

  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      nip: '',
      password: ''
    }, onSubmit: (values) => {
      axios({
        method: "post",
        url: urls.login_url,
        data: values,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }).then(
        data => {
          console.log(data.data);

          if (data.data.success) {
            let token = data.data.token;
            localStorage.setItem("token", token);

            setRedirect(true);
          }
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    }
  });

  return (
    <>
      <Helmet>
        <title>Login | Aplikasi Kehadiran Divusi</title>
      </Helmet>
      {
        redirect ? (
          <Redirect to="/dashboard" />
        ) : (
          <Box
            sx={{
              backgroundColor: 'background.default',
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              justifyContent: 'center'
            }}
          >
            <Typography
              color="text.secondary"
              gutterBottom
              variant="h3"
              align="center"
              fontWeight={700}
            >
              APLIKASI KEHADIRAN
            </Typography>
            <Container maxWidth="md">
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="text.secondary"
                    gutterBottom
                    variant="body2"
                  >
                    Masuk menggunakan NIP
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  id="nip"
                  label="Nomor Induk Pegawai"
                  margin="normal"
                  name="nip"
                  variant="outlined"
                  {...getFieldProps('nip')}
                />
                <TextField
                  fullWidth
                  id="password"
                  label="Password"
                  margin="normal"
                  name="password"
                  type="password"
                  variant="outlined"
                  {...getFieldProps('password')}
                />

                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    masuk
                  </Button>
                </Box>
              </form>
            </Container>

          </Box>
        )
      }
    </>

  )
}

export default LoginPage;