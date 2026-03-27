import AppRouter from "./router/AppRouter";
import GlobalStyle from "./styles/GlobalStyle";
import Header from "./components/layout/Header";

function App() {
	return (
		<>
			<GlobalStyle />
			<Header cartCount={3} />
			<AppRouter />
		</>
	);
}

export default App;
