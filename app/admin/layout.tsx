import { Provider } from "../../context/Provider";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <section>{children}</section>
    </Provider>
  );
}
