import React, { FC } from 'react';
import { Toolbar, AppBar, Typography } from '@material-ui/core';

const Header: FC = () => {

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          To-Do App - Yaokun Lin
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;