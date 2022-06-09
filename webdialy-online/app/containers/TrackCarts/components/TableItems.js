import React, { useState } from 'react';
import { getCookie } from 'react-use-cookie';
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
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Swal from 'sweetalert2';
import ButtonLink from 'components/ButtonLink';
import * as appConstants from 'containers/App/constants';
import SearchBar from 'components/SearchBar';
import ShowQRCode from 'components/ShowQRCode';
import messages, { scope } from './messages';

const useStyles = makeStyles(() => ({
  container: {
    padding: '10px',
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
}));

export default function TableItems(props) {
  const database = getCookie('database');
  const { getList, showCommand = true, tabFilter } = props;
  let showList = getList.slice();
  showList = showList.filter(item => item.shopping_step === tabFilter);
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

  const onViewItem = item => {
    props.onChangePage('VIEW');
    props.onLoadView(item);
  };

  TableItems.propTypes = {
    getList: PropTypes.array,
    onDeleteItem: PropTypes.func,
    onLoadView: PropTypes.func,
    onChangePage: PropTypes.func,
    onLoadEdit: PropTypes.func,
    onInitLoad: PropTypes.func,
    showCommand: PropTypes.bool,
    profile: PropTypes.object,
    onSearch: PropTypes.func,
    tabFilter: PropTypes.string,
    title: PropTypes.string,
  };

  const handleRefreshPage = () => {
    if (props.profile.member_role === 'member') {
      props.onSearch('member_code', props.profile.code);
    } else {
      props.onInitLoad();
    }
  };

  // show qrcode dialog
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState('');

  const handleClickOpen = cartNo => {
    setOpen(true);
    setCart(cartNo);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <TableContainer component={Paper} className={classes.container}>
        <Typography color="textSecondary" variant="h6">
          {props.title}
        </Typography>
        <div className={classes.wrapButtonAction}>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonRefresh}
            onClick={handleRefreshPage}
          >
            <FormattedMessage {...messages.refresh} />
          </Button>
        </div>
        {props.profile.member_role !== 'member' && (
          <SearchBar
            {...props}
            items={[
              { key: 'cart_no', value: 'Cart No' },
              { key: 'member_code', value: 'Member Code' },
              { key: 'cart_active', value: 'Status' },
            ]}
          />
        )}
        <div className={classes.dataWidth}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.colRow}>
                <TableCell align="center">
                  <FormattedMessage {...messages.no} />
                </TableCell>
                <TableCell align="center">
                  <FormattedMessage {...messages.cartNo} />
                </TableCell>
                <TableCell align="center">
                  <FormattedMessage {...messages.createDate} />
                </TableCell>
                <TableCell align="center">
                  <FormattedMessage {...messages.member} />
                </TableCell>
                {tabFilter !== 'not_approve' && (
                  <React.Fragment>
                    <TableCell align="center">
                      <FormattedMessage {...messages.items} />
                    </TableCell>
                    <TableCell align="center">
                      <FormattedMessage {...messages.amount} />
                    </TableCell>
                    <TableCell align="center">
                      <FormattedMessage {...messages.point} />
                    </TableCell>
                    <TableCell align="center">
                      <FormattedMessage {...messages.step} />
                    </TableCell>
                    <TableCell align="center">
                      <FormattedMessage {...messages.active} />
                    </TableCell>
                  </React.Fragment>
                )}
                {tabFilter === 'not_approve' && (
                  <TableCell align="center">
                    <FormattedMessage {...messages.reason_not_approve} />
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {showList &&
                showList
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
                      <TableCell align="center">
                        {item.shopping_step === 'order' && (
                          <ButtonLink
                            size="bold"
                            title="ทำรายการสั่งซื้อต่อ"
                            to={`${appConstants.publicPath}/home/checkout-orders/${item.cart_no}`}
                            color="primary"
                          >
                            {item.cart_no}
                          </ButtonLink>
                        )}
                        {item.shopping_step !== 'order' && <span>{item.cart_no}</span>}
                      </TableCell>
                      <TableCell align="center">{item.cart_create_date}</TableCell>
                      <TableCell align="center">{item.member_code}</TableCell>
                      {tabFilter !== 'not_approve' && (
                        <React.Fragment>
                          <TableCell align="center">{item.total_item}</TableCell>
                          <TableCell align="center">{item.total_amount}</TableCell>
                          <TableCell align="center">{item.total_point}</TableCell>
                          <TableCell align="center">
                            <FormattedMessage id={`${scope}.${item.shopping_step}`} />
                          </TableCell>
                          <TableCell align="center">{item.cart_active}</TableCell>
                          {item.shopping_step === 'approve' && (
                            <TableCell align="center">
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => handleClickOpen(item.cart_no)}
                              >
                                Show QRCode
                              </Button>
                            </TableCell>
                          )}
                          {showCommand && (
                            <TableCell align="center">
                              <Grid container spacing={1} justifyContent="center">
                                <Grid item>
                                  <Button variant="outlined" onClick={() => onViewItem(item)}>
                                    View
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
                          )}
                        </React.Fragment>
                      )}
                      {tabFilter === 'not_approve' && (
                        <TableCell align="center" style={{ color: 'red' }}>
                          {item.emp_reason}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
              {showList.length === 0 && (
                <TableRow>
                  <TableCell align="left" colSpan={9}>
                    ไม่พบข้อมูล
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
        count={showList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <ShowQRCode open={open} onClose={handleClose} cart={cart} db={database} />
    </React.Fragment>
  );
}
