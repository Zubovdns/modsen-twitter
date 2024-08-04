import { Controller, useFormContext } from 'react-hook-form';
import { getDaysInMonth } from '@utils/getDaysInMonth';
import { getYears } from '@utils/getYears';

import { DAY, DESCRIPTION, LABEL, MONTH, months } from '../constants';
import { ValidationError } from '../styled';

import {
	DateSelect,
	DateWrapper,
	DefaultOption,
	Description,
	Label,
	MonthSelect,
	Option,
} from './styled';
import { DateSelectorProps } from './types';

export const DateSelector = ({
	monthError,
	dayError,
	yearError,
}: DateSelectorProps) => {
	const { control, watch } = useFormContext();
	const month = watch('month');
	const year = watch('year');
	const days = getDaysInMonth(month, year);

	return (
		<>
			<Label>{LABEL}</Label>
			<Description>{DESCRIPTION}</Description>
			<DateWrapper>
				<Controller
					control={control}
					name='month'
					rules={{ required: 'Please select a valid month.' }}
					render={({ field }) => (
						<MonthSelect {...field} $error={!!monthError}>
							<DefaultOption value=''>{MONTH}</DefaultOption>
							{months.map((month) => (
								<Option key={month} value={month}>
									{month}
								</Option>
							))}
						</MonthSelect>
					)}
				/>
				<Controller
					control={control}
					name='day'
					rules={{
						required: 'Please select a valid day.',
						validate: (value) => {
							const dayNumber = Number(value);
							return (
								(dayNumber > 0 && dayNumber <= days.length) ||
								'Invalid day selected'
							);
						},
					}}
					render={({ field }) => (
						<DateSelect {...field} $error={!!dayError}>
							<DefaultOption value=''>{DAY}</DefaultOption>
							{days.map((day) => (
								<Option key={day} value={day}>
									{day}
								</Option>
							))}
						</DateSelect>
					)}
				/>
				<Controller
					control={control}
					name='year'
					rules={{ required: 'Please select a valid year.' }}
					render={({ field }) => (
						<DateSelect {...field} $error={!!yearError}>
							{getYears().map((year) => (
								<Option key={year} value={year}>
									{year}
								</Option>
							))}
						</DateSelect>
					)}
				/>
			</DateWrapper>
			{(monthError || dayError || yearError) && (
				<ValidationError>{monthError || dayError || yearError}</ValidationError>
			)}
		</>
	);
};
