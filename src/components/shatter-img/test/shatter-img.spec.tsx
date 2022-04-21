import { newSpecPage } from '@stencil/core/testing';
import { ShatterImg } from '../shatter-img';

describe('shatter-img', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ShatterImg],
      html: `<shatter-img></shatter-img>`,
    });
    expect(page.root).toEqualHtml(`
      <shatter-img>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </shatter-img>
    `);
  });
});
