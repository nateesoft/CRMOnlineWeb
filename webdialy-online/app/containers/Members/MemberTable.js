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
    maxHeight: 440,
    padding: '10px',
  },
  table: {
    minWidth: 690,
  },
});

export default function MemberTable(props) {
  const { members, onInitLoad, onDelete } = props;
  const handleDelete = memberCode => {
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
        onDelete(memberCode);
        onInitLoad();
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  MemberTable.propTypes = {
    members: PropTypes.array,
    onInitLoad: PropTypes.func,
    onDelete: PropTypes.func,
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Typography color="textSecondary" variant="h6">
          Member tables
        </Typography>

        <Table
          className={classes.table}
          stickyHeader
          aria-label="sticky table"
          style={{ padding: '5px' }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">Code</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="right">Point</TableCell>
              <TableCell align="right">Redemption</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.Member_Code}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.Member_Code}</TableCell>
                  <TableCell align="left">{row.Member_Email}</TableCell>
                  <TableCell align="right">{row.Member_TotalScore}</TableCell>
                  <TableCell align="right">
                    {row.Member_TotalPurchase}
                  </TableCell>
                  <TableCell align="right">
                    <Grid container spacing={1} justify="center">
                      <Grid item>
                        <Button variant="outlined">Edit</Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelete(row.Member_Code)}
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={members.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
