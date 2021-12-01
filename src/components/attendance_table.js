import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";


const AttendanceTable = ({ attendanceData }) => {
  return (
    <>
      <Card
        sx={{
          overflow: 'auto',
          maxHeight: '100vh'
        }}
      >
        <Typography
          sx={{
            textTransform: 'capitalize',
            fontWeight: 700,
            p: 2
          }}
        >
          Data Kehadiran Pegawai
        </Typography>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography
                    fontWeight={700}
                  >
                    NIP
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    fontWeight={700}
                  >
                    Nama Pegawai
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    fontWeight={700}
                  >
                    Jabatan Fungsional
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    fontWeight={700}
                  >
                    Jabatan Struktural
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    fontWeight={700}
                  >
                    Jam Masuk
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    fontWeight={700}
                  >
                    Jam Keluar
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    fontWeight={700}
                  >
                    Tanggal
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    fontWeight={700}
                  >
                    Bulan
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    fontWeight={700}
                  >
                    Tahun
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {attendanceData.map((data) => (
                <TableRow>
                  <TableCell>
                    {data.nip}
                  </TableCell>
                  <TableCell>
                    {data.nama_pegawai}
                  </TableCell>
                  <TableCell>
                    {data.jabatan_fungsional}
                  </TableCell>
                  <TableCell>
                    {data.jabatan_struktural}
                  </TableCell>
                  <TableCell>
                    {
                      (data.jam_masuk === "0") ? "-" : data.jam_masuk
                    }
                  </TableCell>
                  <TableCell>
                    {
                      (data.jam_keluar === "0") ? "-" : data.jam_keluar
                    }
                  </TableCell>
                  <TableCell>
                    {data.tanggal}
                  </TableCell>
                  <TableCell>
                    {data.bulan}
                  </TableCell>
                  <TableCell>
                    {data.tahun}
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>

        </CardContent>
      </Card>

    </>

  )
}

export default AttendanceTable;