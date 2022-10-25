import React, { useMemo, useEffect, useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import type { SortDirection } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import SearchBar from "material-ui-search-bar";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";

import moment from "moment";
import debouce from "lodash.debounce";

import {
  selectBank,
  setSearched,
  setPage,
  setRowsPerPage,
  setOrder,
  setBankAccounts,
  setDateRange,
} from "@/lib/features/bankSlice";
import { useDispatch, useSelector } from "react-redux";
import type { BankState } from "@/lib/types";
import type { RootState } from "@/lib/store";
import { Link } from "react-router-dom";

import TablePaginationActions from "@/components/TablePaginationActions";
import DateRangePicker from "@/components/DateRangePicker";

const BankAccountTable = () => {
  const dispatch = useDispatch();
  const bank = useSelector<RootState, BankState>(selectBank);
  const { results, searched, rowsPerPage, currentPage, order } = bank;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    currentPage > 0
      ? Math.max(0, (1 + currentPage) * rowsPerPage - results.length)
      : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>) => {
    const isAsc = order === "asc";
    const sorted = [...results].sort((a, b) => {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      // return new Date(b.transactionDate) - new Date(a.transactionDate);
      return (
        moment(b.transactionDate).valueOf() -
        moment(a.transactionDate).valueOf()
      );
    });
    // console.log(sorted);
    dispatch(setBankAccounts(isAsc ? sorted : sorted.reverse()));
    dispatch(setOrder(isAsc ? "desc" : "asc"));
  };

  const requestSearch = useCallback(
    (searchedVal: string) => {
      dispatch(setSearched(searchedVal));
    },
    [dispatch]
  );

  const cancelSearch = () => {
    dispatch(setSearched(""));
    requestSearch(searched);
  };

  const debouncedResults = useMemo(() => {
    return debouce(requestSearch, 300);
  }, [requestSearch]);

  useEffect(() => {
    return () => {
      // Remove side effect when re-render.
      debouncedResults.cancel();
    };
  });

  return (
    <Box>
      <Paper>
        <SearchBar
          value={searched}
          onChange={debouncedResults}
          onCancelSearch={() => cancelSearch()}
        />
        <DateRangePicker />
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button
            variant="outlined"
            onClick={(e) => dispatch(setDateRange([1664553600000, null]))}
          >
            10/01/2022 - null
          </Button>
          <Button
            variant="outlined"
            onClick={(e) => dispatch(setDateRange([1452268800000, null]))}
          >
            01/09/2016 - null
          </Button>
          <Button
            variant="outlined"
            onClick={(e) => dispatch(setDateRange([null, 1452700800000]))}
          >
            null - 01/14/2016
          </Button>
          <Button
            variant="outlined"
            onClick={(e) =>
              dispatch(setDateRange([1452268800000, 1452700800000]))
            }
          >
            01/09/2016 - 01/14/2016
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={(e) => dispatch(setDateRange([null, null]))}
          >
            Clear Range
          </Button>
        </ButtonGroup>
        <Typography variant="h5" gutterBottom>
          Search Results: {results.length}
        </Typography>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Id</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell
                  align="right"
                  padding={true ? "none" : "normal"}
                  sortDirection={order as SortDirection}
                >
                  <TableSortLabel
                    active={true}
                    direction={order as "asc" | "desc" | undefined}
                    onClick={(event: React.MouseEvent<unknown>) => {
                      handleRequestSort(event);
                    }}
                  >
                    Transaction Date
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? results.slice(
                    currentPage * rowsPerPage,
                    currentPage * rowsPerPage + rowsPerPage
                  )
                : results
              ).map((account) => (
                <TableRow key={account.id}>
                  <TableCell component="th" scope="row">
                    {account.id}
                  </TableCell>
                  <TableCell align="right">{account.category}</TableCell>
                  <TableCell align="right">{account.description}</TableCell>
                  <TableCell align="right">{account.transactionDate}</TableCell>
                  <TableCell align="right">
                    <Link to={`/${account.id}`}>
                      <Button>Detail</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={4}
                  count={results.length}
                  rowsPerPage={rowsPerPage}
                  page={currentPage}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "Rows Per Page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default BankAccountTable;
