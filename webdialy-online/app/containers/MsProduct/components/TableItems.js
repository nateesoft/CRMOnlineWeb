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
  container: {
    padding: '10px',
  },
  table: {
    paddingTop: '5px',
  },
  buttonUpload: {
    backgroundColor: 'green',
    color: 'white',
    '&:hover': {
      backgroundColor: 'darkgreen',
    },
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
    <React.Fragment>
      <TableContainer component={Paper} className={classes.container}>
        <Typography color="textSecondary" variant="h6">
          ข้อมูลสินค้า
        </Typography>
        <Grid container spacing={1}>
          <Grid item>
            <Button id="btnCreate" variant="contained" onClick={() => props.onChangePage('NEW')}>
              Create
            </Button>
          </Grid>
          <Grid item>
            <Button
              id="btnLoadProduct"
              variant="contained"
              onClick={() => props.onChangePage('LOAD_PRODUCT')}
              className={classes.buttonUpload}
            >
              Upload
            </Button>
          </Grid>
          <Grid item>
            <Button
              id="btnRefresh"
              variant="contained"
              color="primary"
              onClick={() => props.onInitLoad()}
            >
              Refresh
            </Button>
          </Grid>
        </Grid>
        <div className={classes.dataWidth}>
          <Table className={classes.table} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className={classes.colRow}>
                <TableCell align="center">No</TableCell>
                <TableCell align="center">Code</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="center">Unit</TableCell>
                <TableCell align="center">Group</TableCell>
                <TableCell align="right">Point</TableCell>
                <TableCell align="center">Stock</TableCell>
                <TableCell align="right">Price_E</TableCell>
                <TableCell align="right">Price_T</TableCell>
                <TableCell align="right">Price_D</TableCell>
                <TableCell align="right">Max Stock</TableCell>
                <TableCell align="right">Min Stock</TableCell>
                <TableCell align="center">Unit Stock</TableCell>
                <TableCell align="left">Path</TableCell>
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
                      <TableCell align="left">{item.name}</TableCell>
                      <TableCell align="center">{item.unit_code_sale}</TableCell>
                      <TableCell align="center">{item.product_group_code}</TableCell>
                      <TableCell align="center">{item.point}</TableCell>
                      <TableCell align="center">{item.stock_code}</TableCell>
                      <TableCell align="center">{item.price_e}</TableCell>
                      <TableCell align="center">{item.price_t}</TableCell>
                      <TableCell align="center">{item.price_d}</TableCell>
                      <TableCell align="center">{item.max_stock}</TableCell>
                      <TableCell align="center">{item.min_stock}</TableCell>
                      <TableCell align="center">{item.unit_code_stock}</TableCell>
                      <TableCell align="left">{item.img_path}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          onClick={() => onEditItem(item)}
                          className={classes.buttonMargin}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelete(item.uuid_index)}
                          className={classes.buttonMargin}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              {getList.length === 0 && (
                <TableRow>
                  <TableCell align="left" colSpan={15}>
                    ไม่พบข้อมูลสินค้า
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
