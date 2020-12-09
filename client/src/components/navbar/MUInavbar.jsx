import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    background: '#3d3835',
  },
}));

export default function MUInavbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='relative' className={classes.appbar}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}></Typography>
          <Button color='inherit'>Articles</Button>
          <Button color='inherit'>Categories</Button>
          <Button color='inherit'>Logout</Button>
          <Avatar
            alt='orofile pic'
            src='//www.gravatar.com/avatar/af48c5ff00270a66f9f8ed9272395e3b?s=200&r=pg&d=mm'
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}
