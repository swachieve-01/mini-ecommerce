//  reviews.js = 리뷰 목록

const reviewDatas = [
  {
    id: 1,
    productId: 94,
    isBest: true,
    rating: 5,
    productName: "그린티 리프레시 마스크팩",
    title: "촉촉하고 산뜻해서 진정이 필요 할 때 쓰면 너무너무 좋아요!",
    content:
      "평소 면도 독 때문에 턱 주변이 늘 붉었는데, 그린티 팩 쓰고 나서 확실히 진정이 빨라요!! 끈적이는 걸 싫어하는데 마무리가 엄청 좋네요!! 그래서 또 사용하게 되네요.",
    userId: "wki34****",
    date: "2025.11.06",
    option: "3종 팩(10매)",
    categoryId: "skin",
    images: [
      "https://i.ibb.co/xqGzFY7L/213bf9f1106a7b2fe915dff994d6c87a3dee16b2.webp",
      "https://i.ibb.co/YBYJbRDy/3.webp",
      "https://i.ibb.co/d4JH3hxx/2.webp",
      "https://i.ibb.co/rG2mcVRy/4.webp",
    ],
  },
  {
    id: 2,
    productId: 89,
    isBest: false,
    rating: 5,
    productName: "뉴티 글루타치온 스킨케어",
    title: "향긋하고 너무 이뻐요!! 또 컬렉션에 보관해야겠어요!!",
    content:
      "제가 지성 피부라서 크림을 잘못 쓰면 금방 답답해지거나 번들거리는 경우가 많아서 항상 가볍게 발리는 제품을 찾는 편이에요. 이 제품은 처음에 손등에 발라봤을 때 질감이 부드럽게 퍼지면서도 너무 무겁지 않아서 마음에 들었어요.",
    userId: "kpop****",
    date: "2025.03.28",
    option: "우유 진정 수분크림",
    categoryId: "skin",
    images: [
      "https://i.ibb.co/8Lk3qzgc/1.webp",
      "https://i.ibb.co/n8s4ZfJD/4.webp",
      "https://i.ibb.co/hG33K5m/5.webp",
    ],
  },
  {
    id: 3,
    productId: 64,
    isBest: false,
    rating: 5,
    productName: "로즈 플로럴 시그니처 향수",
    title: "촉촉하고 산뜻해서 진정이 필요할 때 쓰면 너무 좋아요!",
    content:
      "처음 뿌렸을 때는 상큼한 느낌이 나고 시간이 지나면 부드러운 꽃향이 남아향이 무겁지 않아서 부담 없이 사용할 수 있고 데이트나 약속 있을 때 뿌리기 좋은향수 같아서 디자인도 예쁘고 화당대 위에 올려두고 인테리어 느낌도 나서 만족이에요!!",
    userId: "vvas1****",
    date: "2025.01.08",
    option: "로즈 향 80ml",
    categoryId: "perfume",
    images: [
      "https://i.ibb.co/jFVGVkB/2026-03-17-173218.webp",
      "https://i.ibb.co/ksMCwhmz/2.webp",
      "https://i.ibb.co/rKwYT1Yp/3.webp",
    ],
  },
  {
    id: 4,
    productId: 43,
    isBest: false,
    rating: 5,
    productName: "우드 허브 딥 클렌징 세트",
    title: "세안할 때도 자극 없이 부드럽게 닦이는 느낌!",
    content:
      "거품이 생각보다 잘 올라와서  따로 거품을 많이 내지 않아도 충분히 부드럽게 세안할 수 있었어요. 거품이 풍성하니 사용감이 꽤 좋았고, 거품형 폼클렌징을 쓰는 것처럼 편하게 느껴지더라고요. 엄청 좋아요 ㅎㅎ...",
    userId: "clean****",
    date: "2025.03.24",
    option: "우드 200ml",
    categoryId: "cleanser",
    images: [
      "https://i.ibb.co/4wKmS0Cs/3.webp",
      "https://i.ibb.co/TDbZ71p1/3.webp",
      "https://i.ibb.co/bRrb0D0b/2.webp",
    ],
  },
  {
    id: 5,
    productId: 25,
    isBest: false,
    rating: 5,
    productName: "글로우 퍼펙션 10H 파운데이션",
    title:
      "이거 진짜 강추!! 가성비도 좋고 밀착도 잘 됩니당 본인 홋수보다 밝게 사시는 거 추천드려용~",
    content:
      "집에 쓰고 있는 파운데이션을 다 써가서 추천받아서 구매하게 되었는데요. 발랐을 때 적당한 촉촉함과 자연스럽게 피부연출이 되고 특유의 끈적한 느낌이 없어서 좋았어요!!",
    userId: "anj1****",
    date: "2025.03.02",
    option: "150ml (파테)",
    categoryId: "makeup",
    images: [
      "https://i.ibb.co/FkWbWGwh/1.webp",
      "https://i.ibb.co/tMfjW7Z8/2.webp",
    ],
  },
  {
    id: 6,
    productId: 2,
    isBest: false,
    rating: 5,
    productName: "그린티 수딩 하이드레이션 앰플",
    title: "촉촉하고 가볍게 흡수돼서 진정이 필요할 때 쓰기 좋아요!",
    content:
      "평소 피부가 예민해서 붉어지기 쉬웠는데, 그린티 앰플 쓰고 나서 확실히 진정이 빨라졌어요! 끈적임 없이 흡수돼서 부담 없이 매일 쓰기 좋고, 피부가 편안해지는 느낌이라 계속 손이 가네요!",
    userId: "efrqq****",
    date: "2025.05.02",
    option: "200ml",
    categoryId: "skin",
    images: [
      "https://i.ibb.co/Xk7bdt9m/1.webp",
      "https://i.ibb.co/mVMjL1gw/image.webp",
    ],
  },
  {
    id: 7,
    productId: 55,
    isBest: false,
    rating: 2,
    productName: "보습 및 윤기 강화 헤어 오일",
    title: "제품이 좀 이상하네요 불량이.. 바로 써야하는데 뭐죠?",
    content:
      "받았는데 하나는 찢어져있는 아주... 네 이상해요. 자주 사용하는 제품인데 이러면 신뢰가 떨어져요.. 상태 보고 사용 하겠습니다.",
    userId: "qaze55****",
    date: "2025.04.11",
    option: "열 케어 650ml",
    categoryId: "hairBody",
    images: [
      "https://i.ibb.co/rGv3C53Z/1.webp",
      "https://i.ibb.co/nsSCbMsm/2.webp",
    ],
  },
];

export default reviewDatas;
