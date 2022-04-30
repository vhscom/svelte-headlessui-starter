import { environment } from '$environment';
import { navigationData } from '$data';
import { graphQLClient } from '$core/services/graphql';
import { navigationOrderedQuery } from '$graphql/navigation-ordered.query';
import { NavItemModel } from '$models/classes/nav-item.model';
import type { INavItem } from '$models/interfaces/nav-item.interface';

export const getOrderedNavigation = async () => {
	if (environment.debug) {
		return navigationData.sort((a, b) => a.weight - b.weight) as NavItemModel[];
	}

	const {
		navigationCollection: { edges: orderedNavigation }
	} = await graphQLClient.request(navigationOrderedQuery);

	const orderedNavItems: NavItemModel[] = orderedNavigation.map((edge: { node: INavItem }) =>
		new NavItemModel().deserialize(edge.node)
	);

	return orderedNavItems;
};
