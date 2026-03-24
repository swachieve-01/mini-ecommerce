import Badge from "../components/ui/Badge";

function HomePage() {
  return (
    <div>
      <div>Home Page</div>
      <Badge variant="free">무료배송</Badge>
      <Badge variant="best">BEST</Badge>
      <Badge variant="sale">세일</Badge>
      <Badge variant="new">NEW</Badge>
      <Badge variant="coupon">쿠폰</Badge>
      <Badge variant="percent">13%</Badge>
      <Badge variant="shipping">배송중</Badge>
      <Badge variant="done">배송완료</Badge>{" "}
    </div>
  );
}

export default HomePage;
