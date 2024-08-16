import { useState } from 'react';

import { Switch } from './styled';

export const ThemeSwitcher = () => {
	const [checked, setChecked] = useState(false);
	const handleThemeChange = () => {
		setChecked((prev) => !prev);
	};
	return <Switch checked={checked} onClick={handleThemeChange} />;
};
