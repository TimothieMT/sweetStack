export default function Head({ params }: { params: { slug: string } }) {
	return (
		<>
			<title>Info Site - About</title>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			/>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			/>
			<meta
				property="og:title"
				content="About Page"
			/>
			<meta property="og:type" content="site" />
			<meta
				property="og:description"
				content="This is the about page. It has a head.tsx file which enables it to have it's own title, description and image for social-media previews."
			/>
			<meta
				property="og:image"
				content="https://et001-nextjs-usecontext.tanguay.eu/images/about-page.png"
			/>
			<meta property="og:url" content="https://starters.tanguay.eu" />
		</>
	);
}
