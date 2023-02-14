import React from 'react';
import '../styles/globals.css';
import '../styles/site.scss';
import Link from 'next/link';
import Head from 'next/head';

interface Props {
	statusCode?: number;
}

const Custom404Page: React.FC<Props> = () => {
	return (
		<div className="sass-error-area text-center">
			<Head>
			<title>Info Site - 404 Page</title>
			</Head>
			<p className="text-gray-900 text-9xl font-extrabold">404</p>
			<div>
				<Link href="/" className="text-yellow-400 text-3xl">
					Go to main page
				</Link>
			</div>
		</div>
	);
};

export default Custom404Page;
