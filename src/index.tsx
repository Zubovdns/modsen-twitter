import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@components/App';
import { GlobalStyles } from '@styles/GlobalStyles';

const MainComponent = () => (
	<>
		<GlobalStyles />
		<App />
	</>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<MainComponent />
		</BrowserRouter>
	</React.StrictMode>
);
