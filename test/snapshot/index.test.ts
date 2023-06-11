import * as puppeteer from 'puppeteer';
import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import Server from '../server';
import { getWebSnapshot } from './browser';

const testSnapshot = ({
    port,
    mode,
}: Readonly<{ mode: 'dark' | 'light'; port: number }>) => {
    const server = Server.of(port);
    let browser: undefined | puppeteer.Browser = undefined;

    beforeAll(async () => {
        await server.start();
        browser = await puppeteer.launch({
            headless: 'new',
            defaultViewport: null,
            args: ['--start-maximized'],
        });
    });

    describe(`Snapshot test of ${mode} mode snapshot`, () => {
        expect.extend({ toMatchImageSnapshot });

        it.each(
            (['pc', 'tablet', 'mobile'] as const).flatMap((platform) =>
                (['home', 'projects', 'contact', 'error'] as const).map(
                    (link) => ({
                        platform,
                        link,
                    })
                )
            )
        )(
            'should detect that layout of $link looks decent on $platform',
            async ({ link, platform }) => {
                if (!browser) {
                    throw new TypeError('browser is undefined');
                }

                const dir = `${__dirname}/snapshot-images/${platform}/${mode}`;
                const image = await getWebSnapshot({
                    mode,
                    link,
                    browser,
                    platform,
                    port: server.getPort(),
                });
                expect(image).toMatchImageSnapshot({
                    customSnapshotsDir: dir,
                    customSnapshotIdentifier: link,
                    failureThreshold: 0.01,
                    failureThresholdType: 'percent',
                });
            }
        );
    });

    afterAll(async () => {
        server.kill();
        await browser?.close();
    });
};

testSnapshot({
    port: 8080,
    mode: 'dark',
});
testSnapshot({
    port: 8081,
    mode: 'light',
});
