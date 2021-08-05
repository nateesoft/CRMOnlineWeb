import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TableItems from './TableItems';

const useStyles = makeStyles(() => ({
  root: {
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
        <Box className={classes.root}>
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
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <React.Fragment>
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
          <Tab label="รายการสินค้าในตะกร้า" {...a11yProps(0)} />
          <Tab label="รออนุมัติ" {...a11yProps(1)} />
          <Tab label="ไม่ผ่านการอนุมัติ" {...a11yProps(2)} />
          <Tab label="ระหว่างจัดส่ง" {...a11yProps(3)} />
          <Tab label="จัดส่งสำเร็จ" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          <TableItems tabFilter="order" title="รายการสินค้าในตะกร้า" {...props} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableItems tabFilter="wait_confirm" title="รายการรออนุมัติ" {...props} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TableItems tabFilter="not_approve" title="รายการที่ไม่ผ่านการอนุมัติ" {...props} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <TableItems tabFilter="approve" title="รายการที่อยู่ระหว่างจัดส่ง" {...props} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <TableItems tabFilter="finish" title="รายการที่จัดส่งเรียบร้อยแล้ว" {...props} />
        </TabPanel>
      </SwipeableViews>
    </React.Fragment>
  );
}
