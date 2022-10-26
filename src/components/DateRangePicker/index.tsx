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

const BasicDateRangePicker = ({
  value,
  onChange,
}: {
  value: DateRange<number | undefined>;
  onChange: (newValue: DateRange<Dayjs>) => void;
}) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{ start: "From", end: "To" }}
    >
      <DateRangePicker
        value={value}
        onChange={onChange}
        renderInput={(startProps, endProps) => {
          // console.log(startProps.inputProps.onChange);
          const startDateProps = {
            ...startProps,
            inputProps: {
              ...startProps.inputProps,
              "data-testid": "date-from-input",
              onChange: onChange as () => {}
              ,
            },
          };
          const endDateProps = {
            ...endProps,
            inputProps: {
              ...endProps.inputProps,
              "data-testid": "date-to-input",
              onChange: onChange as () => {},
            },
          };
          return (
            <React.Fragment>
              <TextField {...startDateProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endDateProps} />
            </React.Fragment>
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default BasicDateRangePicker;
