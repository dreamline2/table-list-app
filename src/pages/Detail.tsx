import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { BankState } from "@/lib/types";
import type { RootState } from "@/lib/store";
import { selectBank } from "@/lib/features/bankSlice";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Detail = () => {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  const bank = useSelector<RootState, BankState>(selectBank);
  const { accounts } = bank;
  const account = accounts.filter((acc) => acc.id.toString() === id)[0];
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        ID: {id}
      </Typography>
      <Typography variant="h5" gutterBottom>
        category: {account.category}
      </Typography>
      <Typography variant="h5" gutterBottom>
        description: {account.description}
      </Typography>
      <Typography variant="h5" gutterBottom>
        credit: {account.credit ? account.credit : 0}
      </Typography>
      <Typography variant="h5" gutterBottom>
        debit: {account.debit ? account.debit : 0}
      </Typography>
      <Typography variant="h5" gutterBottom>
        transactionDate: {account.transactionDate}
      </Typography>
      <Link to={`/`}>
        <Button variant="contained">Back</Button>
      </Link>
    </Box>
  );
};

export default Detail;
