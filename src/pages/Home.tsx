import { bankApi } from "@/lib/services";
import BankAccountTable from "@/components/BankAccountTable";

const Home = () => {
  const { data, error, isLoading } =
    bankApi.endpoints.getBankAccounts.useQuery();
  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <BankAccountTable />
        </>
      ) : null}
    </>
  );
};

export default Home;
