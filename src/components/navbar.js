import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '.././assets/logo.svg';

const Navbar = ({ onMobileNavOpen, ...rest }) => {
  return (
    <AppBar
      elevation={1}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/dashboard">
          <img
            alt="Logo"
            src={Logo}
            height="50px"
          />
        </RouterLink>
        <Box
          sx={{ flexGrow: 1 }}
        >
          <Typography
            color="white"
            gutterBottom
            variant="h5"
            align="center"
            fontWeight={700}
          >
            APLIKASI KEHADIRAN
          </Typography>

        </Box>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar >
  )
}

export default Navbar;