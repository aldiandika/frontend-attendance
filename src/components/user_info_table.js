import { Card, CardContent, CardHeader, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";


const UserInfoTable = ({ usersData }) => {

  return (
    <>
      <Card>
        <CardHeader title="Data Info Pegawai" />
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Nip
                </TableCell>
                <TableCell>
                  Nama Pegawai
                </TableCell>
                <TableCell>
                  Jabatan Fungsional
                </TableCell>
                <TableCell>
                  Jabatan Struktural
                </TableCell>
                <TableCell>
                  Jumlah Izin
                </TableCell>
                <TableCell>
                  Jumlah Alpha
                </TableCell>
                <TableCell>
                  Jumlah Hadir
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