import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ContentPage from './ContentPage';

const useStyles = makeStyles(() => ({
  box: {
    marginTop: '5px',
  },
}));
function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={classes.box}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function TabLayout(props) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static" color="default" variant="outlined">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="รอการอนุมัติ" {...a11yProps(0)} />
          <Tab label="อนุมัติแล้ว" {...a11yProps(1)} />
          <Tab label="ไม่ผ่านการอนุมัติ" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ContentPage approve="0" title="รอการอนุมัติ" {...props} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ContentPage approve="1" title="อนุมัติแล้ว" {...props} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ContentPage approve="" title="ไม่ผ่านการอนุมัติ" {...props} />
      </TabPanel>
    </>
  );
}
