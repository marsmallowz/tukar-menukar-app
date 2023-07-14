import React from "react";
import { getUserFromToken } from "../../actions/userActions";
import FormSetPassword from "../../../components/FormSetPassword";

export default async function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const user = await getUserFromToken(searchParams.token);
  return (
    <div>
      {user !== null ? (
        <FormSetPassword user={user} token={searchParams.token} />
      ) : (
        <div>Token is expired</div>
      )}
    </div>
  );
}
