import React, { useState } from 'react';
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Swal from 'sweetalert2';

import SearchBar from 'components/SearchBar';

const useStyles = makeStyles({
  container: {
    padding: '10px',
    width: '100%',
  },
  table: {
    padding: '5px',
    overflow: 'auto',
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
  buttonMargin: {
    margin: '5px',
  },
});

export default function TableItems(props) {
  const { getList } = props;
  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Confirm to delete this member!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.value) {
        props.onDeleteItem(id);
        props.onInitLoad(0, 20);
        Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
      }
    });
  };

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);

    // reload data
    props.onInitLoad({ page: 1, limit: +event.target.value });
  };

  const onViewItem = item => {
    props.onChangePage('VIEW');
    props.onLoadView(item);
  };

  const onEditItem = item => {
    props.onChangePage('EDIT');
    props.onLoadEdit(item);
  };

  TableItems.propTypes = {
    getList: PropTypes.array,
    onDeleteItem: PropTypes.func,
    onLoadView: PropTypes.func,
    onChangePage: PropTypes.func,
    onLoadEdit: PropTypes.func,
    onInitLoad: PropTypes.func,
  };

  return (
    <>
      <TableContainer className={classes.container}>
        <Typography color="textSecondary" variant="h6">
          รายชื่อสมาชิกในระบบ
        </Typography>
        <div className={classes.wrapButtonAction}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.buttonRefresh}
            onClick={() => props.onInitLoad()}
          >
            REFRESH
          </Button>
        </div>
        <SearchBar
          {...props}
          items={[
            { key: '', value: '' },
            { key: 'code', value: 'Code' },
            { key: 'email', value: 'Email' },
            { key: 'mobile', value: 'Mobile' },
          ]}
        />
        <div className={classes.dataWidth}>
          <Table className={classes.table} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className={classes.colRow}>
                <TableCell align="center">No</TableCell>
                <TableCell align="center">Code</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Surname</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="left">Created Date</TableCell>
                <TableCell align="center">Actions</TableCell>
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
                      <TableCell align="center">{item.code}</TableCell>
                      <TableCell align="left">{item.email}</TableCell>
                      <TableCell align="left">{item.first_name}</TableCell>
                      <TableCell align="left">{item.last_name}</TableCell>
                      <TableCell align="center">{item.member_role}</TableCell>
                      <TableCell align="left">
                        {dateFormat(item.system_created, 'dd/mm/yyyy hh:M:s')}
                      </TableCell>
                      <TableCell align="left" className={classes.colRow}>
                        <Button
                          variant="text"
                          onClick={() => onViewItem(item)}
                          className={classes.buttonMargin}
                        >
                          View
                        </Button>
                        <Button
                          variant="text"
                          onClick={() => onEditItem(item)}
                          className={classes.buttonMargin}
                        >
                          Edit
                        </Button>
                        {item.member_role !== 'admin' && item.member_role !== 'super' && (
                          <Button
                            variant="text"
                            color="secondary"
                            onClick={() => handleDelete(item.email)}
                            className={classes.buttonMargin}
                          >
                            Delete
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              {getList.length === 0 && (
                <TableRow>
                  <TableCell align="left" colSpan={9}>
                    ไม่พบข้อมูลสมาชิก
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20, 50, 100, 500, 1000]}
        component="div"
        count={getList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
