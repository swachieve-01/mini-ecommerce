const theme = {
	layout: {
		maxWidth: "1440px",
		padding: "0 20px",
	},

	// 페이지 중앙 정렬
	container: {
		width: "100%",
		maxWidth: "1440px",
		margin: "0 auto",
	},

	fontSize: {
		xs: "12px",
		sm: "14px",
		md: "16px",
		lg: "18px",
		xl: "20px",
		xxl: "24px",
		xxxl: "28px",
		displaySm: "30px",
		displayMd: "40px",
		displayLg: "44px",
		displayXl: "56px",
		displayXxl: "60px",
		displayXxxl: "68px",
	},

	fontWeight: {
		regular: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
	},
	colors: {
		primary: "#8FA77E",
		primaryDark: "#4F6A4E",
		error: "#D74040",
		sale: "#E53935",
		freeDelivery: "#4A90E2",
		orderBadge: "#6CA346",
		textMain: "#222222",
		textSub: "#7C7C7C",
		border: "#E2E2E2",
		borderFocus: "#DCDCDC",
		bg: "#FFFFFF",
		bgSoft: "#F9F9F9",
		red: "#FF4D4F",
		orange: "#FA8C16",
		yellow: "#FADB14",
		green: "#52C41A",
		blue: "#1677FF",
		navy: "#1D39C4",
		purple: "#722ED1",
		stars: "#f5a623",
		reviewBadge: "#FDECEC",

		/* ========================= 테두리 & 경계선 or 텍스트 활용 ========================= */
		white: "#FFFFFF",
		black: "#000000",
		gray100: "#F5F5F5",
		gray200: "#E8E8E8",
		gray300: "#D9D9D9",
		gray400: "#BFBFBF",
		gray500: "#8C8C8C",
		gray600: "#595959",
		gray700: "#434343",
		gray800: "#262626",
		gray900: "#1F1F1F",
	},

	badge: {
		free: "#E8F0FE",
		best: "#FDECEC",
		sale: "#FFF4E5",
		new: "#EAF7ED",
		coupon: "#E6F7F5",
		shipping: "#F5F1E6",
		done: "#EDF6E9",
	},

	badgeText: {
		free: "#3561E5",
		best: "#E53935",
		sale: "#FB8C00",
		new: "#43A047",
		coupon: "#14B8A6",
		shipping: "#BC9D37",
		done: "#6CA346",
		review: "#E57373",
	},

	border: {
		thin: "1px solid #E2E2E2",
		thick: "2px solid #DCDCDC",
	},

	radius: {
		sm: "4px",
		md: "6px",
		lg: "8px",
		xl: "10px",
		xxl: "12px",
		xxxl: "34px",
		pill: "999px",
	},

	spacing: {
		xs: "4px",
		sm: "8px",
		md: "16px",
		lg: "24px",
		xl: "40px",
		titleBlock: "70px", // 타이틀 위아래
		section: "120px", // 섹션 ↔ 상품
	},

	transition: {
		fast: "0.2s ease",
		normal: "0.3s ease",
	},

	opacity: {
		hover: 0.7,
		disabled: 0.4,
	},

	// 웹에서 확임 필요함
	scale: {
		hover: 1.03,
		active: 0.97,
	},

	media: {
		tablet: "@media (max-width: 1024px)",
		mobile: "@media (max-width: 768px)",
		smallMobile: "@media (max-width: 480px)",
	},

	shadow: {
		sm: "0 2px 6px rgba(0,0,0,0.05)",
		md: "0 4px 12px rgba(0,0,0,0.08)",
		lg: "0 8px 20px rgba(0,0,0,0.12)",
	},
};

export default theme;
