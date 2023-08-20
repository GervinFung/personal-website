import React from 'react';
import Script from 'next/script';
import links from '../../links';

const Schema = () => {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: (['home', 'projects', 'contact'] as const).map(
			(name, index) => {
				return {
					name,
					'@type': 'ListItem',
					position: index + 1,
					item: `${links.domain}/${name === 'home' ? '' : name}`,
				};
			}
		),
	};

	return (
		<Script
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(structuredData, undefined, 4),
			}}
		/>
	);
};

export default Schema;
