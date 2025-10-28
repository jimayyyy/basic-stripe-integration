import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface SidebarState {
	isOpen: boolean;
}

const initialState: SidebarState = {
	isOpen: false,
};

const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState,
	reducers: {
		openSidebar: (state) => {
			state.isOpen = true;
		},
		closeSidebar: (state) => {
			state.isOpen = false;
		},
	},
});

export const { openSidebar, closeSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;

export const isSidebarOpen = (state: RootState) => state.sidebar.isOpen;
