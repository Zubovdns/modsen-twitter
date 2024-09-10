import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@components/App';
import { DARK, LIGHT } from '@constants/theme';
import { useAppSelector } from '@store/hooks';
import { store } from '@store/index';
import { themeMode } from '@store/selectors/theme';
import { GlobalStyles } from '@styles/GlobalStyles';
import { darkTheme } from '@styles/theme/theme.dark';
import { lightTheme } from '@styles/theme/theme.light';
import { ThemeProvider } from 'styled-components';

const MainComponent = () => {
	const theme = useAppSelector(themeMode);

	return (
		<ThemeProvider theme={theme === DARK ? lightTheme : darkTheme}>
			<GlobalStyles />
			<App />
		</ThemeProvider>
	);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<MainComponent />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);
