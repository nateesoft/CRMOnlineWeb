import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import SearchBar from 'components/SearchBar';

const useStyles = makeStyles({
  container: {
    padding: '10px',
  },
  table: {
    padding: '5px',
  },
  buttonNew: {
    marginRight: '5px',
  },
  buttonRefresh: {
    marginRight: '5px',
  },
  wrapButtonAction: {
    marginTop: '15px',
    marginBottom: '15px',
  },
  colRow: {
    whiteSpace: 'nowrap',
  },
  dataWidth: {
    overflow: 'auto',
  },
});

export default function TableItems(props) {
  const { getList } = props;
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  TableItems.propTypes = {
    getList: PropTypes.array,
    onChangePage: PropTypes.func,
    onInitLoad: PropTypes.func,
  };

  return (
    <React.Fragment>
      <TableContainer component={Paper} className={classes.container}>
        <Typography color="textSecondary" variant="h6">
          ข้อมูลการใช้โปรโมชั่น
        </Typography>
        <SearchBar
          {...props}
          items={[
            { key: 'redeem_code', value: 'Redeem Code' },
            { key: 'bill_no', value: 'Bill No' },
          ]}
        />
        <div className={classes.dataWidth}>
          <Table className={classes.table} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className={classes.colRow}>
                <TableCell align="center">No</TableCell>
                <TableCell align="center">Code</TableCell>
                <TableCell align="left">Redeem Name</TableCell>
                <TableCell align="center">Bill No</TableCell>
                <TableCell align="right">Disc.Amt</TableCell>
                <TableCell align="right">Disc.Percent</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Product</TableCell>
                <TableCell align="center">Point</TableCell>
                <TableCell align="center">Branch</TableCell>
                <TableCell align="center">Employee</TableCell>
                <TableCell align="center">Member</TableCell>
                <TableCell align="center">Qty</TableCell>
                <TableCell align="center">System Created</TableCell>
                <TableCell align="center">Redeem Date</TableCell>
                <TableCell align="center">Expired</TableCell>
                <TableCell align="center">Status Use</TableCell>
                <TableCell align="center">Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getList &&
                getList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={item.uuid_index}
                      className={classes.colRow}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{item.redeem_code}</TableCell>
                      <TableCell align="left">{item.redeem_name}</TableCell>
                      <TableCell align="center">{item.bill_no}</TableCell>
                      <TableCell align="right">{item.discount_amt}</TableCell>
                      <TableCell align="right">{item.discount_percent}</TableCell>
                      <TableCell align="center">{item.redeem_or_free}</TableCell>
                      <TableCell align="center">{item.product_code}</TableCell>
                      <TableCell align="center">{item.point_to_redeem}</TableCell>
                      <TableCell align="center">{item.use_in_branch}</TableCell>
                      <TableCell align="center">{item.emp_code_redeem}</TableCell>
                      <TableCell align="center">{item.member_code_use}</TableCell>
                      <TableCell align="center">{item.qty_in_use}</TableCell>
                      <TableCell align="center">{item.system_create}</TableCell>
                      <TableCell align="center">{item.redeem_date}</TableCell>
                      <TableCell align="center">{item.in_time}</TableCell>
                      <TableCell align="center">{item.status_use}</TableCell>
                      <TableCell align="center">{item.active}</TableCell>
                    </TableRow>
                  ))}
              {getList.length === 0 && (
                <TableRow>
                  <TableCell align="left" colSpan={18}>
                    ไม่พบข้อมูลรายการโปรโมชั่น
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={getList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
}
