import * as puppeteer from 'puppeteer';
import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import Server from '../server';
import { getWebSnapshot } from './browser';

describe('UI screenshot test', () => {
    const server = Server.of(8080);
    let browser: undefined | puppeteer.Browser = undefined;

    beforeAll(async () => {
        await server.start();
        browser = await puppeteer.launch({
            headless: 'new',
            defaultViewport: null,
            args: ['--start-maximized'],
        });
    });

    describe.each(['dark', 'light'] as const)(
        `Snapshot test of %s mode snapshot`,
        (mode) => {
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
        }
    );

    afterAll(async () => {
        server.kill();
        await browser?.close();
    });
});
