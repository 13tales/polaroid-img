import { newE2EPage } from '@stencil/core/testing';

describe('shatter-img', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<shatter-img></shatter-img>');

    const element = await page.find('shatter-img');
    expect(element).toHaveClass('hydrated');
  });
});
