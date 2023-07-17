import getCurrentUser from "../actions/getCurrentUser";
import FormUpdateProfile from "../../components/FormUpdateProfile";

export default async function Page() {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <FormUpdateProfile currentUser={currentUser} />
    </div>
  );
}
