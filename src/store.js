import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './redux/taskSlice.js';

const store = configureStore({
	reducer: {
		tasks: tasksReducer,
	},
});

export default store;
