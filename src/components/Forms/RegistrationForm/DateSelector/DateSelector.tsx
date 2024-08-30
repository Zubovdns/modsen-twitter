import { Controller, useFormContext } from 'react-hook-form';
import { getDaysInMonth } from '@utils/getDaysInMonth';
import { getYears } from '@utils/getYears';

import { ValidationError } from '../../styled';
import { DAY, DESCRIPTION, LABEL, MONTH, months } from '../constants';

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
	const year = watch('year') ?? new Date().getFullYear();
	const day = watch('day');
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
							<DefaultOption value='' disabled={month}>
								{MONTH}
							</DefaultOption>
							{months.map((monthName, index) => (
								<Option
									key={monthName}
									value={index}
									selected={month === index + 1}
								>
									{monthName}
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
							<DefaultOption value='' disabled={day}>
								{DAY}
							</DefaultOption>
							{days.map((dayValue) => (
								<Option
									key={dayValue}
									value={dayValue}
									selected={day === dayValue}
								>
									{dayValue}
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
							{getYears().map((yearValue) => (
								<Option
									key={yearValue}
									value={yearValue}
									selected={year === yearValue}
								>
									{yearValue}
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
