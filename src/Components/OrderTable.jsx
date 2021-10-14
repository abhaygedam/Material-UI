import { AppBar, Drawer, IconButton, Toolbar, Typography,Divider,Grid, Card, Box,CssBaseline, ListItem, ListItemText, List } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from '@mui/icons-material/Menu';
import GithubIcon from '@mui/icons-material/GitHub';
import MessageIcon from '@mui/icons-material/Message';
import { useEffect, useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, CardContent } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { CardPage } from "./Card";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import {
  Chart,
    BarSeries,
  PieSeries
} from '@devexpress/dx-react-chart-material-ui';

const data = [
  { year: '1950', population: 2.525 },
  { year: '1960', population: 3.018 },
  { year: '1970', population: 3.682 },
  { year: '1980', population: 4.440 },
  { year: '1990', population: 5.310 },
  { year: '2000', population: 6.127 },
  { year: '2010', population: 6.930 },
];



const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
  alignItems: 'center',
  height: "150px",
    padding: theme.spacing(0, 1),
  padding: "10px 20px",
  // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  
}));

 

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flex: 1,
    },
    buttonNavbar: {
        padding: 10
    },
}));

const data2 = [
  { country: 'Russia', area: 12 },
  { country: 'Canada', area: 7 },
  { country: 'USA', area: 7 },
  { country: 'China', area: 7 },
  { country: 'Brazil', area: 6 },
  { country: 'Australia', area: 5 },
  { country: 'India', area: 2 },
  { country: 'Others', area: 55 },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'orders_size', headerName: 'Size', width: 120 },
  { field: 'full_name', headerName: 'Full name', width: 140 },
  {
    field: 'user_city',
    headerName: 'City',
    width: 120,
    },
   {
    field: 'order_price',
    headerName: 'Order Price',
    width: 140,
    },
   {
    field: 'status',
    headerName: 'Status',
    width: 120,
    },
   {
    field: 'created_at',
    headerName: 'Created at',
    width: 160,
  },
  {
    field: 'days_to_finish',
    headerName: 'Duration',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
];


function OrderTable(props) {

    const [rows, setRows] = useState([]);
    useEffect(() => {
        getData()
    },[]);
 
   
    const getData = async () => {
         const res = await axios.get("http://localhost:3003/orders");
        console.log(res.data);
        setRows(res.data);
    }
     const  chartData = useState(data); 
    const classes = useStyles();

    const theme = useTheme();
    const [open, setOpen] = useState(false);

   const handleDrawerOpen = () => {
    setOpen(true);
    };

    const handleDrawerClose = () => {
    setOpen(false);
    };

    return (
       <Box sx={{ display: 'flex' }}>
         <CssBaseline />
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    className={classes.menuButton}
                    color="inherit" aria-label="menu" edge="start" onClick={handleDrawerOpen} sx={{ mr: 2, ...(open && { display: 'none' }) }}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Masai School
                </Typography>
                <IconButton color="inherit">
                    <GithubIcon />
                        <Typography className={classes.buttonNavbar} variant="h6" color="inherit">
                             Github
                        </Typography>
                </IconButton>
                 <IconButton color="inherit">
                    <MessageIcon />
                        <Typography className={classes.buttonNavbar} variant="h6" color="inherit">
                             Slack
                        </Typography> 
                </IconButton>
            </Toolbar>
            </AppBar>

          <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
                    <Avatar>MS</Avatar>
                    <Typography variant="h6">
                        Masai School
                    </Typography>
                     <Typography variant="subtitle1">
                        Ftweb 10
                    </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Dashboard', 'Orders'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
            </Drawer>
           
            <div style={{ height: 400, width: '80%', marginLeft:"-40px" }} open={open}>
                  <DrawerHeader style={{marginTop: "-60px"}} />
         <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
              </div>
    </Box>    
    )
}

export { OrderTable };