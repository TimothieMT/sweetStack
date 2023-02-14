'use client';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';

function Header() {
	const activeSegment = useSelectedLayoutSegment();

	return (
		<>
			<div className="headerArea">
				<img src="images/info-icon.png" />
				<h1 className="text-yellow-400 text-3xl font-bold mb-4">
					Info Site - Next.js 13
				</h1>
			</div>
			<nav className="bg-neutral-800 py-1 px-2 mb-4">
				<Link
					href="/"
					className={`mr-3 ${activeSegment === null ? 'active' : ''}`}
				>
					Welcome
				</Link>
				<Link
					href="/info"
					className={`mr-3 ${
						activeSegment === 'info' ? 'active' : ''
					}`}
				>
					Info
				</Link>
				<Link
					href="/about"
					className={`mr-3 ${
						activeSegment === 'about' ? 'active' : ''
					}`}
				>
					About
				</Link>
			</nav>
		</>
	);
}

export default Header;
