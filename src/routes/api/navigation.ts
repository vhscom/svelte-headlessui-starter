import type { RequestHandler } from '@sveltejs/kit';
import { navigationData } from '$data';
import { environment } from '$environment';
import { supabase } from '$core/services/supabase';
import { NavItemModel } from '$models/classes/nav-item.model';

export const get: RequestHandler = async () => {
	if (environment.debug) return { body: JSON.stringify(navigationData) };

	const { data: navigation, error } = await supabase.from('navigation').select('*');

	if (error) {
		return {
			status: Number(error.code),
			body: error.message
		};
	}

	const navItems: NavItemModel[] = navigation.map((value) => new NavItemModel().deserialize(value));

	return {
		body: JSON.stringify(navItems)
	};
};
