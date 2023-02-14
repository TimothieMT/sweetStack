export default function Head({ params }: { params: { slug: string } }) {
	return (
		<>
			<title>Info Site - Info</title>
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
				content="THE INFO PAGE"
			/>
			<meta property="og:type" content="site" />
			<meta
				property="og:description"
				content="This is a page about information, etc."
			/>
			<meta
				property="og:image"
				content="https://et001-nextjs-usecontext.tanguay.eu/images/info-page.png"
			/>
			<meta property="og:url" content="https://starters.tanguay.eu" />
		</>
	);
}
