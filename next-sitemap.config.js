const url = process.env.NEXT_PUBLIC_ORIGIN;
const process = require('process');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: url,
	generateRobotsTxt: true, // (optional)
	exclude: ['/server-sitemap.xml'],
	robotsTxtOptions: {
		additionalSitemaps: [`${url}/server-sitemap.xml`],
	},
};
