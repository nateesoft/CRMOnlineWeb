import React, { useState } from 'react';
import { getCookie } from 'react-use-cookie';
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
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Swal from 'sweetalert2';
import { FormattedMessage } from 'react-intl';
import ButtonLink from 'components/ButtonLink';
import * as appConstants from 'containers/App/constants';
import SearchBar from 'components/SearchBar';
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
  const { getList, showCommand = true, profile } = props;
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

  const handleRefreshPage = () => {
    if (props.profile.member_role === 'member') {
      props.onSearch('member_code', props.profile.code);
    } else {
      props.onInitLoad();
    }
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
  };

  return (
    <>
      <TableContainer className={classes.container}>
        <Typography color="textSecondary" variant="h6">
          <FormattedMessage {...messages.headerTableItems} />
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
              { key: 'order_no', value: 'Order' },
              { key: 'cart_no', value: 'Cart' },
              { key: 'member_code', value: 'Member' },
            ]}
          />
        )}
        <div className={classes.dataWidth}>
          <Table className={classes.table} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className={classes.colRow}>
                <TableCell align="center">
                  <FormattedMessage {...messages.no} />
                </TableCell>
                <TableCell align="center">
                  <FormattedMessage {...messages.orderNo} />
                </TableCell>
                <TableCell align="center">
                  <FormattedMessage {...messages.cart} />
                </TableCell>
                <TableCell align="center">
                  <FormattedMessage {...messages.createDate} />
                </TableCell>
                <TableCell align="center">
                  <FormattedMessage {...messages.member} />
                </TableCell>
                <TableCell align="center">
                  <FormattedMessage {...messages.item} />
                </TableCell>
                <TableCell align="center">
                  <FormattedMessage {...messages.amount} />
                </TableCell>
                <TableCell align="center">
                  <FormattedMessage {...messages.statusAction} />
                </TableCell>
                <TableCell align="center">
                  <FormattedMessage {...messages.point} />
                </TableCell>
                <TableCell align="center">
                  <FormattedMessage {...messages.approveStatus} />
                </TableCell>
                <TableCell align="center">
                  <FormattedMessage {...messages.notApproveComment} />
                </TableCell>
                <TableCell align="center">
                  <FormattedMessage {...messages.actions} />
                </TableCell>
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
                      <TableCell align="center">
                        {profile.member_role === 'member' ? (
                          <ButtonLink
                            color="primary"
                            to={`${appConstants.publicPath}/order_confirm/${
                              item.cart_no
                            }/${getCookie('database')}`}
                          >
                            {item.order_no}
                          </ButtonLink>
                        ) : (
                          <span>{item.order_no}</span>
                        )}
                      </TableCell>
                      <TableCell align="center">{item.cart_no}</TableCell>
                      <TableCell align="center">{item.cart_create_date}</TableCell>
                      <TableCell align="center">{item.member_code}</TableCell>
                      <TableCell align="center">{item.total_item}</TableCell>
                      <TableCell align="center">{item.total_amount}</TableCell>
                      <TableCell align="center">{item.cart_active}</TableCell>
                      <TableCell align="center">{item.total_point}</TableCell>
                      <TableCell align="center">
                        {item.order_status && (
                          <FormattedMessage id={`${scope}.${item.order_status}`} />
                        )}
                      </TableCell>
                      <TableCell align="center">{item.member_remark}</TableCell>
                      <TableCell align="center">
                        {showCommand && (
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
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              {getList.length === 0 && (
                <TableRow>
                  <TableCell align="left" colSpan={13}>
                    ไม่พบข้อมูลสินค้าที่สั่งซื้อ
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
    </>
  );
}
