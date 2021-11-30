import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import Clock from 'react-live-clock';
import { useEffect, useState } from "react";
import axios from "axios";
import urls from '../__mocks/urls';

const InputAttend = ({
  userInfo,
  userAttend,
  userAttendNow
}) => {

  const dateNow = new Date();
  const hourNow = dateNow.getHours();

  // Debug
  // const hourNow = 17;

  const [checkIn, setCheckIn] = useState(false);
  const [checkOut, setCheckOut] = useState(false);
  const [isCheckIn, setIsCheckIn] = useState(false);
  const [isCheckOut, setIsCheckOut] = useState(false);

  useEffect(() => {
    if ((hourNow >= 8) && (hourNow <= 10)) {
      setCheckIn(true);
      setCheckOut(false);
    } else if ((hourNow >= 17) && (hourNow <= 18)) {
      setCheckIn(false);
      setCheckOut(true);
    } else {
      setCheckIn(false);
      setCheckOut(false);
    }
  }, [hourNow])

  const onCheckIn = () => {
    const token = localStorage.getItem('token');
    axios({
      method: "get",
      url: urls.input_attend,
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'Bearer ' + token
      }
    }).then(
      res => {
        if (res.data.success) {
          setIsCheckIn(res.data.message)
        }
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
  }

  const onCheckOut = () => {
    const token = localStorage.getItem('token');
    axios({
      method: "get",
      url: urls.input_attend,
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'Bearer ' + token
      }
    }).then(
      res => {
        if (res.data.success) {
          setIsCheckOut(res.data.message)
        }
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
  }

  return (
    <>
      <Card
        sx={{
          overflow: 'auto'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
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
            Hello {userInfo.nama_pegawai}, sudah input kehadiran hari ini ?
          </Typography>
        </Box>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography
              sx={{
                fontSize: "1.5em",
                fontWeight: 700,
                color: "primary.main"
              }}
            >
              <Clock
                format={'HH:mm:ss'}
                ticking={true}
                timezone={'Asia/Jakarta'}
              />
            </Typography>

          </Box>

          {/* Control text */}
          <Box
            sx={{
              py: 2
            }}
          >
            {(userAttendNow || isCheckIn) ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1em",
                    fontWeight: 700,
                    textTransform: "capitalize",
                    color: "text.secondary"
                  }}
                >
                  {isCheckIn ? (
                    <>
                      Jam masuk : {isCheckIn}
                    </>
                  ) : (
                    <>
                      Jam masuk : {
                        userAttendNow.jam_masuk === "0" ? (
                          <>-</>
                        ) : (
                          <>{userAttendNow.jam_masuk}</>
                        )
                      }
                    </>
                  )}
                </Typography>
              </Box>
            ) : (
              <>
                <Typography
                  sx={{
                    fontSize: "1em",
                    fontWeight: 700,
                    textTransform: "capitalize",
                    color: "grey"
                  }}
                >
                  Jam Masuk : -
                </Typography>
              </>
            )}
          </Box>

          {/* Pulang */}
          <Box>
            {(userAttendNow || isCheckOut) ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1em",
                    fontWeight: 700,
                    textTransform: "capitalize",
                    color: "text.secondary"
                  }}
                >
                  {isCheckOut ? (
                    <>
                      Jam pulang : {isCheckOut}
                    </>
                  ) : (
                    <>
                      Jam pulang : {
                        userAttendNow.jam_keluar === "0" ? (
                          <>-</>
                        ) : (
                          <>{userAttendNow.jam_keluar}</>
                        )
                      }
                    </>
                  )}
                </Typography>
              </Box>
            ) : (
              <>
                <Typography
                  sx={{
                    fontSize: "1em",
                    fontWeight: 700,
                    textTransform: "capitalize",
                    color: "grey"
                  }}
                >
                  Jam pulang : -
                </Typography>
              </>
            )}
          </Box>

          {/* Control Button */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box flexGrow={1}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                Tombol absen masuk
              </Box>
              {(userAttendNow || isCheckIn) ? (
                <>
                  <Box sx={{ p: 2 }}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      variant="contained"
                      disabled={true}
                    >
                      masuk
                    </Button>
                  </Box>
                </>
              ) : (<>
                {checkIn ? (
                  <>
                    <Box sx={{ p: 2 }}>
                      <Button
                        color="primary"
                        fullWidth
                        size="large"
                        variant="contained"
                        disabled={false}
                        onClick={onCheckIn}
                      >
                        masuk
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box sx={{ p: 2 }}>
                      <Button
                        color="primary"
                        fullWidth
                        size="large"
                        variant="contained"
                        disabled={true}
                      >
                        masuk
                      </Button>
                    </Box>
                  </>
                )}
              </>)}
            </Box>

            {/* Button pulang */}
            <Box
              flexGrow={1}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                Tombol absen pulang
              </Box>
              {(userAttendNow) ? (
                <>
                  {checkOut ? (
                    <>
                      {!isCheckOut ? (
                        <Box sx={{ p: 2 }}>
                          <Button
                            color="primary"
                            fullWidth
                            size="large"
                            variant="contained"
                            disabled={false}
                            onClick={onCheckOut}
                          >
                            pulang
                          </Button>
                        </Box>
                      ) : (
                        <Box sx={{ p: 2 }}>
                          <Button
                            color="primary"
                            fullWidth
                            size="large"
                            variant="contained"
                            disabled={true}
                          >
                            pulang
                          </Button>
                        </Box>
                      )}
                    </>
                  ) : (
                    <Box sx={{ p: 2 }}>
                      <Button
                        color="primary"
                        fullWidth
                        size="large"
                        variant="contained"
                        disabled={true}
                      >
                        pulang
                      </Button>
                    </Box>
                  )}

                </>
              ) : (<>
                <Box sx={{ p: 2 }}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    variant="contained"
                    disabled={true}
                  >
                    pulang
                  </Button>
                </Box>
              </>)}
            </Box>

          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default InputAttend;