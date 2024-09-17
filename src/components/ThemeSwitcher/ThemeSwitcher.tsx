import { useState } from 'react';

import { DARK, LIGHT } from '@constants/theme';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { themeMode } from '@store/selectors/theme';
import { setTheme } from '@store/slices/theme';

import { Switch } from './styled';

export const ThemeSwitcher = () => {
	const dispatch = useAppDispatch();
	const theme = useAppSelector(themeMode);

	const [checked, setChecked] = useState(theme === DARK);

	const handleThemeChange = () => {
		dispatch(setTheme(checked ? LIGHT : DARK));
		setChecked((prev) => !prev);
	};

	return <Switch checked={checked} onClick={handleThemeChange} />;
};
