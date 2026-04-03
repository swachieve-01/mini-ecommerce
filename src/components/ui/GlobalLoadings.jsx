import Loading from "../components/ui/Loading";

export default function Layout() {
  const { globalLoading } = useLoadingStore(); // o아니면 state

  return (
    <>
      <Header />

      {globalLoading && (
        <Loading loading={true} full message="상품 불러오고 있습니다..." />
      )}

      <Outlet />
    </>
  );
}
