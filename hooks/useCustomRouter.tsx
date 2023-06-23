import { useRouter, useSearchParams } from "next/navigation";

const useCustomeRouter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query: { [key: string]: string | any } = {};
  let search = searchParams.get("search");
  let page = searchParams.get("page");

  if (search) query.search = search;
  if (page) query.page = parseInt(page);
  // if (sort) query.sort = sort;

  const pushQuery = ({ search, page }: { search?: string; page?: number }) => {
    if (search !== undefined) {
      search === "" ? delete query.search : (query.search = search);
    }
    if (page !== undefined) {
      page === 1 ? delete query.page : (query.page = page);
    }
    const newQuery = new URLSearchParams(query).toString();

    router.push(`?${newQuery}`);
  };

  return { pushQuery, query };
};

export default useCustomeRouter;
