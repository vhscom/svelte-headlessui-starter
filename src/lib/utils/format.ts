import type { INavItem } from '$models/interfaces/nav-item.interface';

export const formatNavigation = (navItems: INavItem[], currentUrl: string) => {
	return navItems
		.sort((a, b) => a.weight - b.weight)
		.map((navItem) => {
			return { ...navItem, current: navItem.href === currentUrl };
		});
};
