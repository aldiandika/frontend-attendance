import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@mui/material';
import MockAvatar from '.././assets/avatars/avatar_1.png';
import { Link as RouterLink } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SideItem from '../components/side_item';
import LogoutIcon from '@mui/icons-material/Logout';
import DownloadIcon from '@mui/icons-material/Download';


const Sidebar = ({
  onMobileClose,
  openMobile,
  user,
  logoutFun,
  downloadRecFun
}) => {

  const itemsAdmin = [
    {
      href: '/dashboard',
      icon: HomeIcon,
      title: 'Dashboard'
    },
    {
      href: '/input-kehadiran',
      icon: PersonIcon,
      title: 'Kehadiran'
    },
    {
      href: '/input-izin',
      icon: EventNoteIcon,
      title: 'Perizinan'
    }
  ];

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={MockAvatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/account"
        />
        <Typography
          color="textPrimary"
          variant="h4"
          fontWeight={700}
          sx={{
            textTransform: "uppercase"
          }}
        >
          {user.nama_pegawai}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
          sx={{ textTransform: "capitalize" }}
        >
          {user.nip} - {user.jabatan_struktural}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
          sx={{ textTransform: "capitalize" }}
        >
          {user.jabatan_fungsional}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {itemsAdmin.map((item) => (
            <SideItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          <Button
            sx={{
              color: 'text.secondary',
              fontWeight: 'medium',
              justifyContent: 'flex-start',
              letterSpacing: 0,
              py: 1.25,
              textTransform: 'none',
              width: '100%',
              '& svg': {
                mr: 1
              },
            }}
            onClick={downloadRecFun}
          >
            <DownloadIcon />
            <span>
              Download Record
            </span>
          </Button>
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          display: 'flex',
          p: 2,

        }}
      >
        <Button
          sx={{
            color: 'red',
            fontWeight: 'medium',
            justifyContent: 'flex-start',
            letterSpacing: 0,
            py: 1.25,
            textTransform: 'none',
            width: '100%',
            '& svg': {
              mr: 1
            },
          }}
          onClick={logoutFun}
        >
          <LogoutIcon />
          <span>
            logout
          </span>
        </Button>
      </Box>
    </Box>

  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  )
}

export default Sidebar;