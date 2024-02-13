
// import React from 'react';
import { AppBar, Toolbar, Typography, InputBase } from '@mui/material';
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" className="bg-red-500 header-bg">
      <Toolbar className="flex justify-between p-4">
        <Link to="/">
        <Typography variant="h6" component="div" className='text-slate-100 size-4 sm:size-8 flex items-center w-fit'>
          Cbuzzil
        </Typography>
        </Link>
        <div className="flex items-center bg-white rounded-lg px-1 sm:px-2 py-1">
        
          <InputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            className="ml-2 w-24 sm:w-64"
          />
          <FaSearch  className='text-slate-500'/>
        </div>
        <div className="space-x-0 sm:space-x-4">
          <Link to="/" className="text-white hidden sm:inline  hover:underline">Home</Link>
          <Link to="/about" className="text-white hidden sm:inline hover:underline">About</Link>
          <Link to="/sign-up" className="text-white hover:underline">Sign Up</Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
