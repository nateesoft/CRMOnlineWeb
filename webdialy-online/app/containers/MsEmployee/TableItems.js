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
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Swal from 'sweetalert2';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 550,
    padding: '10px',
  },
  table: {
    minWidth: 690,
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
        props.onInitLoad();
        Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
      }
    });
  };

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

  const onEditItem = item => {
    props.onChangePage('EDIT');
    props.onLoadEdit(item);
  };

  TableItems.propTypes = {
    getList: PropTypes.array,
    onDeleteItem: PropTypes.func,
    onLoadEdit: PropTypes.func,
    onChangePage: PropTypes.func,
    onInitLoad: PropTypes.func,
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Typography color="textSecondary" variant="h6">
          Employee Table List
        </Typography>
        <div className={classes.wrapButtonAction}>
          <Button
            variant="contained"
            className={classes.buttonNew}
            onClick={() => props.onChangePage('NEW')}
          >
            CREATE
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonRefresh}
            onClick={() => props.onInitLoad()}
          >
            REFRESH
          </Button>
        </div>
        <Table className={classes.table} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">Code</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Role Code</TableCell>
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
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{item.code}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.role_code}</TableCell>
                    <TableCell align="center">
                      <Grid container spacing={1} justify="center">
                        <Grid item>
                          <Button
                            variant="outlined"
                            onClick={() => onEditItem(item)}
                          >
                            Edit
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDelete(item.uuid_index)}
                          >
                            Delete
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
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
    </Paper>
  );
}
