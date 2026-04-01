import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

import App from "./App.jsx";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import Toast from "./components/feedback/Toast.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<GlobalStyle />
				<Toast />
				<App />
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>
);
