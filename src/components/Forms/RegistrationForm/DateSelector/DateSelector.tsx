import { Controller, useFormContext } from 'react-hook-form';

import { getDaysInMonth } from '@utils/getDaysInMonth';
import { getYears } from '@utils/getYears';

import { ValidationError } from '../../styled';
import { DAY, DESCRIPTION, LABEL, MONTH, months } from '../constants';

import {
	DateContainer,
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
		<DateWrapper>
			<Label>{LABEL}</Label>
			<Description>{DESCRIPTION}</Description>
			<DateContainer>
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
								<Option key={monthName} value={index + 1}>
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
					}}
					render={({ field }) => (
						<DateSelect {...field} $error={!!dayError}>
							<DefaultOption value='' disabled={day}>
								{DAY}
							</DefaultOption>
							{days.map((dayValue) => (
								<Option key={dayValue} value={dayValue}>
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
								<Option key={yearValue} value={yearValue}>
									{yearValue}
								</Option>
							))}
						</DateSelect>
					)}
				/>
			</DateContainer>
			{(monthError || dayError || yearError) && (
				<ValidationError>{monthError || dayError || yearError}</ValidationError>
			)}
		</DateWrapper>
	);
};
