<script lang="ts">
	import { page } from '$app/stores';
	import type { MetaTagsProps } from 'svelte-meta-tags';
	import { MetaTags } from 'svelte-meta-tags';
	import { siteData } from '$data';

	export let pageTitle: string;

	const locale = 'en';

	const images = siteData.images.map((image) => {
		return { ...image, url: new URL(image.url, $page.url.origin).toString() };
	});
	const canonical = $page.url.href;
	const title = pageTitle ? `${pageTitle} - ${siteData.name}` : siteData.name;
	const description = siteData.description;
	const [twitterImage] = images;

	const metatags: MetaTagsProps = {
		title,
		description,
		canonical,
		openGraph: {
			type: 'website',
			url: canonical,
			locale,
			title: pageTitle,
			description,
			images,
			site_name: siteData.name
		},
		twitter: {
			cardType: 'summary_large_image',
			image: twitterImage.url
		},
		additionalMetaTags: [{ name: 'keywords', content: siteData.keywords.join(',') }]
	};
</script>

<MetaTags {...metatags} />
