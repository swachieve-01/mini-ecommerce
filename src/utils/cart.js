const CART_KEY = "cartItems";

export function getCartItems() {
	const stored = localStorage.getItem(CART_KEY);
	return stored ? JSON.parse(stored) : [];
}

export function getCartCount() {
	const items = getCartItems();
	return items.reduce((total, item) => total + item.quantity, 0);
}

export function addToCart(product) {
	const items = getCartItems();

	const existingItem = items.find((item) => item.id === product.id);

	let updatedItems;

	if (existingItem) {
		updatedItems = items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
	} else {
		updatedItems = [...items, { ...product, quantity: 1 }];
	}

	localStorage.setItem(CART_KEY, JSON.stringify(updatedItems));

	window.dispatchEvent(new Event("cartUpdated"));
}
