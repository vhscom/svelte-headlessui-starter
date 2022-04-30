import { gql } from '$core/services/graphql';

export const navigationOrderedQuery = gql`
	query NavigationOrderedQuery {
		navigationCollection(orderBy: [{ weight: AscNullsFirst }]) {
			edges {
				node {
					name
					href
					weight
				}
			}
		}
	}
`;
