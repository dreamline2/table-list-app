import * as React from "react";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import {
  DateRangePicker,
  DateRange,
} from "@mui/x-date-pickers-pro/DateRangePicker";
import { selectBank, setDateRange } from "@/lib/features/bankSlice";
import { useDispatch, useSelector } from "react-redux";
import type { BankState } from "@/lib/types";
import type { RootState } from "@/lib/store";
import moment from "moment";

const BasicDateRangePicker = () => {
  const dispatch = useDispatch();
  const bank = useSelector<RootState, BankState>(selectBank);
  const { dateRange } = bank;
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{ start: "From", end: "To" }}
    >
      <DateRangePicker
        value={dateRange}
        onChange={(newValue: DateRange<Dayjs>) => {
          const dateRange = newValue.map((time) =>
            time ? moment(time?.format()).valueOf() : null
          ) as DateRange<number>;
          // console.log(dateRange);
          dispatch(setDateRange(dateRange));
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
};

export default BasicDateRangePicker;
