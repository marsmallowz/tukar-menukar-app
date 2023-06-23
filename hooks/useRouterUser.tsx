import { useRouter, useSearchParams } from "next/navigation";

const useRouterUser = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query: { [key: string]: string | any } = {};
  let username = searchParams.get("username");
  let page = searchParams.get("page");

  if (username) query.username = username;
  if (page) query.page = parseInt(page);
  // if (sort) query.sort = sort;

  const pushQuery = ({
    username,
    page,
  }: {
    username?: string;
    page?: number;
  }) => {
    if (username !== undefined) {
      username === "" ? delete query.username : (query.username = username);
    }
    if (page !== undefined) {
      page === 1 ? delete query.page : (query.page = page);
    }
    const newQuery = new URLSearchParams(query).toString();

    router.push(`?${newQuery}`);
  };

  return { pushQuery, query };
};

export default useRouterUser;
