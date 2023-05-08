import { expect, test } from '@playwright/test';

test('Click bleep() and bloop() buttons', async ({ page }) => {
	await page.goto('/');
  
	// Click the bloop() button and wait for the Con component to appear
	await page.click('button:has-text("bleep()")');
	await page.waitForSelector('p:has-text("toCon")');
  
	// Click the bleep() button multiple times
	let Kerouac = ['Kerouac', 'erouac', 'eroua', 'roua']
	for (let i = 0; i < 4; i++) {
		console.info("look at the Kerouac-Con i:"+i)
		let presip = await page.$('c_sip:has-text("1.2.1.2.2")')
		// select the nodule above sip
		let prenod = await presip?.$('..')
		// check this is an element named nodule
		expect(await prenod?.evaluate(el => el.tagName)).toBe('NODULE')
		let prect = await prenod?.$('s_ct')

		expect(await prect.textContent()).toBe(Kerouac[i])

		if (i == 3) break
		console.info("click bloop()")
		await page.click('button:has-text("bloop()")');
	}
});
