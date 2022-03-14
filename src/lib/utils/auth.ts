export const protectRoute = (session: App.Session, pathname: string) => {
	const signinUrl = '/account/signin';
	return pathname !== signinUrl && !session.user ? { redirect: signinUrl, status: 302 } : {};
};
