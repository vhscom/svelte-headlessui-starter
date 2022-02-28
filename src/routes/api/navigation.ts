import type { RequestHandler } from '@sveltejs/kit';
import { navigationData } from '$data';
// import { supabase } from '$core/services/supabase';
// import { NavItemModel } from '$models/classes/nav-item.model';

export const get: RequestHandler = async () => {
	// const res = await supabase.from('navigation').select('*');
	// const data = res.data ? res.data.map((value) => new NavItemModel().deserialize(value)) : null;

	return {
		body: JSON.stringify(navigationData)
	};
};
