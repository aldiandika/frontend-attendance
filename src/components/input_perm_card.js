import {
  Card,
  CardContent,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Button
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import urls from "../__mocks/urls";

const InputPermCard = () => {
  const [visibility, setVisibility] = useState('hidden');
  const [alasan, setAlasan] = useState();
  const [isInput, setIsInput] = useState(false);

  const onAlasanChange = (event) => {
    // console.log(event.target.value);
    const selectedIndex = event.target.value;

    if (selectedIndex === 1) {
      setVisibility('visible');
    } else {
      setVisibility('hidden');
      setAlasan('sakit');
    }
  }

  const onTextChange = (event) => {
    setAlasan(event.target.value);
  }

  const sendRequest = () => {
    let alasanData = alasan;
    console.log(alasanData);

    const token = localStorage.getItem('token');
    axios({
      method: "post",
      url: urls.input_perm,
      data: alasanData,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'Bearer ' + token
      }
    }).then(
      data => {
        console.log(data.data);
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
    setIsInput(true);
  }

  const listAlasan = [
    {
      "key": 0,
      "value": "Sakit"
    },
    {
      "key": 1,
      "value": "Lainnya"
    },
  ]

  return (
    <Card>
      {isInput ? (
        <>
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
                Perizinan Sudah Diinput
              </Typography>
            </Box>
          </Card>

        </>
      ) : (
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
            Input Perizinan
          </Typography>
          <CardContent>
            <Box
              sx={{
                width: '60vw'
              }}
            >
              <InputLabel id="alasan-label">Alasan Izin</InputLabel>
              <Select
                required
                variant="filled"
                id="alasan"
                size='small'
                color='primary'
                labelId="alasan-label"
                label="Alasan"
                onChange={onAlasanChange}
                sx={{
                  width: '100%',
                }}
              >
                {listAlasan.map((item) => (
                  <MenuItem value={item.key} >{item.value}</MenuItem>
                ))}
              </Select>

              <Box
                sx={{
                  width: '100%',
                  visibility: { visibility },
                  py: 4
                }}
              >
                <TextField
                  required
                  fullWidth
                  id="alasan_lain"
                  label="Alasan lain"
                  variant="filled"
                  size='medium'
                  color='primary'
                  InputLabelProps={{ style: { color: 'primary.main' } }}
                  onChange={onTextChange}
                />
              </Box>

              <Box sx={{ py: 2, width: '100%' }}>
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={sendRequest}
                >
                  ajukan izin
                </Button>
              </Box>

            </Box>

          </CardContent>
        </Box>
      )}

    </Card>
  )
}

export default InputPermCard