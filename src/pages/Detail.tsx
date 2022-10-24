import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { BankState } from "@/lib/types";
import type { RootState } from "@/lib/store";
import { selectBank } from "@/lib/features/bankSlice";

const Detail = () => {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  const bank = useSelector<RootState, BankState>(selectBank);
  const { accounts } = bank;
  return <>ID: {id}</>;
};

export default Detail;
