import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import {
  Chip,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Grid
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  link: {
    fontWeight: "600",
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#e51c34",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    fontStyle: "bold",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "& .MuiTableCell-body": {
      color: "#e51c34",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StickyHeadTable = (props) => {
  const { columns, rows, handleDisplay } = props;
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowLen, setRowLen] = useState(0);
  const [colLen, setColLen] = useState(0);

  useEffect(() => {
    if (rows.length !== undefined) {
      setRowLen(rows.length);
    }

    if(columns.length !== undefined){
      setColLen(columns.length)
    }
  }, [rows]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowLen <= 0 && (
              <StyledTableRow>
                <TableCell align="center" colSpan={colLen}>
                  No record/s found
                </TableCell>
              </StyledTableRow>
            )}
            {rowLen > 0 &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      {columns.map((column) => {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {handleDisplay && handleDisplay(row, column)}
                            {!handleDisplay && (row[column.id])}
                          </TableCell>
                        );
                      })}
                    </StyledTableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rowLen}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default StickyHeadTable;
