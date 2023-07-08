import { useRouter, useSearchParams } from "next/navigation";

const useCustomeRouter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query: { [key: string]: string | any } = {};
  let search = searchParams.get("search");
  let page = searchParams.get("page");
  let filter = searchParams.get("filter");

  if (search) query.search = search;
  if (page) query.page = parseInt(page);
  if (filter) query.filter = filter;

  // if (sort) query.sort = sort;

  const pushQuery = ({
    search,
    page,
    filter,
  }: {
    search?: string;
    page?: number;
    filter?: string;
  }) => {
    if (search !== undefined) {
      search === "" ? delete query.search : (query.search = search);
    }
    if (page !== undefined) {
      page === 1 ? delete query.page : (query.page = page);
    }
    if (filter !== undefined) {
      filter === "" ? delete query.filter : (query.filter = filter);
    }
    const newQuery = new URLSearchParams(query).toString();

    router.push(`?${newQuery}`);
  };

  return { pushQuery, query };
};

export default useCustomeRouter;
