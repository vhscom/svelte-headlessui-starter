import dayjs, { type Dayjs } from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';
dayjs.extend(weekOfYear);

export const getDayGridForMonth = (date: Dayjs = dayjs(), weeksToShow = 6) => {
	const startOfMonth = date.startOf('month');
	const startOfGrid = startOfMonth.subtract(startOfMonth.day(), 'day');

	const dayGrid = new Map();
	[...Array(weeksToShow).keys()].forEach((week) => {
		dayGrid.set(
			week,
			[...Array(7).keys()].map((day) => startOfGrid.add(week, 'week').add(day, 'day'))
		);
	});

	return dayGrid;
};
