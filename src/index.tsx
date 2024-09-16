import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider } from 'styled-components';

import { App } from '@components/App';
import { DARK } from '@constants/theme';
import { useAppSelector } from '@store/hooks';
import { persistor, store } from '@store/index';
import { themeMode } from '@store/selectors/theme';
import { GlobalStyles } from '@styles/GlobalStyles';
import { darkTheme } from '@styles/theme/theme.dark';
import { lightTheme } from '@styles/theme/theme.light';

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
				<PersistGate loading={null} persistor={persistor}>
					<MainComponent />
				</PersistGate>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);
