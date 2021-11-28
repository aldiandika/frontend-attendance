import {
  Avatar,
  Box,
  // Button,
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


const Sidebar = ({
  onMobileClose,
  openMobile,
  user
}) => {

  const itemsAdmin = [
    {
      href: '/dashboard',
      icon: HomeIcon,
      title: 'Dashboard'
    },
    {
      href: '/kehadiran',
      icon: PersonIcon,
      title: 'Kehadiran'
    },
    {
      href: '/perizinan',
      icon: EventNoteIcon,
      title: 'Perizinan'
    },
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
        </List>
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