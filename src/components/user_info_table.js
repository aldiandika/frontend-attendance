import { Card, CardContent, CardHeader, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";


const UserInfoTable = ({ usersData }) => {

  return (
    <>
      <Card
        sx={{
          overflow: 'auto'
        }}
      >
        <CardHeader title="Data Info Pegawai" />
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
                    Jumlah Izin
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    fontWeight={700}
                  >
                    Jumlah Alpha
                  </Typography>

                </TableCell>
                <TableCell>
                  <Typography
                    fontWeight={700}
                  >
                    Jumlah Hadir
                  </Typography>

                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {usersData.map((user) => (
                <TableRow>
                  <TableCell>
                    {user.nip}
                  </TableCell>
                  <TableCell>
                    {user.nama_pegawai}
                  </TableCell>
                  <TableCell>
                    {user.jabatan_fungsional}
                  </TableCell>
                  <TableCell>
                    {user.jabatan_struktural}
                  </TableCell>
                  <TableCell>
                    {user.jumlah_izin}
                  </TableCell>
                  <TableCell>
                    {user.jumlah_alpha}
                  </TableCell>
                  <TableCell>
                    {user.jumlah_hadir}
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

export default UserInfoTable;