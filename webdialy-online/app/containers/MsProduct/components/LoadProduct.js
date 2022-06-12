import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import CSVReader from 'react-csv-reader';
import { v4 } from 'uuid';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  table: {},
  colRow: {
    whiteSpace: 'nowrap',
  },
  container: {
    padding: '10px',
    marginBottom: '10px',
  },
}));

export default function LoadProduct(props) {
  const classes = useStyles();
  const { productImports: rows } = props;

  const csvJSON = lines => {
    const result = [];
    const headers = lines[0];
    props.onSetHeaders(headers);
    for (let i = 1; i < lines.length; i += 1) {
      if (lines[i]) {
        const obj = {};
        const currentline = lines[i];
        for (let j = 0; j < headers.length; j += 1) {
          obj[headers[j]] = currentline[j];
        }
        result.push({ ...obj, uuid_index: v4() });
      }
    }
    return result;
  };

  const handleFileData = list => {
    props.onLoadDataFromFile(csvJSON(list));
  };

  return (
    <>
      <TableContainer className={classes.container}>
        <Typography color="textSecondary" variant="h6">
          โหลดข้อมูลสินค้า
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <CSVReader
              cssClass="csv-reader-input"
              label="Select CSV file "
              onFileLoaded={handleFileData}
              inputId="fileUpload"
              inputName="fileUpload"
              inputStyle={{ color: 'red' }}
            />
          </Grid>
        </Grid>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.colRow}>
              <TableCell>#</TableCell>
              <TableCell align="left">code</TableCell>
              <TableCell align="left">name</TableCell>
              <TableCell align="right">unit</TableCell>
              <TableCell align="center">group</TableCell>
              <TableCell align="left">image_path</TableCell>
              <TableCell align="right">point</TableCell>
              <TableCell align="right">stock_code</TableCell>
              <TableCell align="right">price_e</TableCell>
              <TableCell align="right">price_t</TableCell>
              <TableCell align="right">price_d</TableCell>
              <TableCell align="right">max_stock</TableCell>
              <TableCell align="right">min_stock</TableCell>
              <TableCell align="right">unit_code_stock</TableCell>
              <TableCell align="right">qty_over_stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row, index) => (
                <TableRow key={v4()} className={classes.colRow}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{row.code}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.unit_code_sale}</TableCell>
                  <TableCell align="center">{row.product_group_code}</TableCell>
                  <TableCell align="left">{row.img_path}</TableCell>
                  <TableCell align="right">{row.point}</TableCell>
                  <TableCell align="right">{row.stock_code}</TableCell>
                  <TableCell align="right">{row.price_e}</TableCell>
                  <TableCell align="right">{row.price_t}</TableCell>
                  <TableCell align="right">{row.price_d}</TableCell>
                  <TableCell align="right">{row.max_stock}</TableCell>
                  <TableCell align="right">{row.min_stock}</TableCell>
                  <TableCell align="right">{row.unit_code_stock}</TableCell>
                  <TableCell align="right">{row.qty_over_stock}</TableCell>
                </TableRow>
              ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell align="left" colSpan={15}>
                  ไม่พบข้อมูลสินค้าสำหรับโหลดเข้าระบบ
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container spacing={1}>
        <Grid item xs={4} lg={3}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => props.onSaveDataImport()}
          >
            <FormattedMessage {...messages.btnSave} />
          </Button>
        </Grid>
        <Grid item xs={4} lg={3}>
          <Button fullWidth variant="contained" onClick={() => props.onChangePage('LIST')}>
            <FormattedMessage {...messages.btnBack} />
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

LoadProduct.propTypes = {
  productImports: PropTypes.array,
  onSetHeaders: PropTypes.func,
  onLoadDataFromFile: PropTypes.func,
  onSaveDataImport: PropTypes.func,
  onChangePage: PropTypes.func,
};
