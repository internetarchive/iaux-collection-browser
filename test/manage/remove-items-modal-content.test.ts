import { fixture } from '@open-wc/testing-helpers';
import { describe, it, expect } from 'vitest';
import { html } from 'lit';
import Sinon from 'sinon';
import type { ManageableItem } from '../../src/models';
import type { RemoveItemsModalContent } from '../../src/manage/remove-items-modal-content';
import '../../src/manage/remove-items-modal-content';

describe('RemoveItemsModalContent', () => {
  const items: ManageableItem[] = [
    { identifier: '1', title: 'Item 1', date: '2022-01-01' },
    { identifier: '2', title: 'Item 2', date: '2022-01-02' },
  ];

  it('renders basic component', async () => {
    const el = await fixture<RemoveItemsModalContent>(html`
      <remove-items-modal-content
        .items=${items}
        .message=${''}
      ></remove-items-modal-content>
    `);

    expect(el.shadowRoot?.querySelector('ul')).to.exist;
    expect(el.shadowRoot?.querySelector('.button-bar')).to.exist;
    expect(el.shadowRoot?.querySelector('.remove-items-btn')).to.exist;
  });

  it('renders list of items', async () => {
    const el = await fixture<RemoveItemsModalContent>(html`
      <remove-items-modal-content
        .items=${items}
        .message=${''}
      ></remove-items-modal-content>
    `);

    const listItems = el.shadowRoot?.querySelectorAll('li');
    expect(listItems).to.have.lengthOf(2);

    listItems?.forEach((item, index) => {
      expect(item.querySelector('.item-title')?.textContent).to.equal(
        items[index].title,
      );
      expect(item.querySelector('.item-date')?.textContent).to.equal(
        items[index].date,
      );
    });
  });

  it('renders message', async () => {
    const message = 'This is a test message';
    const el = await fixture<RemoveItemsModalContent>(html`
      <remove-items-modal-content
        .items=${[]}
        .message=${message}
      ></remove-items-modal-content>
    `);

    expect(el.shadowRoot?.querySelector('.message')?.textContent).to.equal(
      message,
    );
  });

  it('dispatches confirm event when remove items button is clicked', async () => {
    const el = await fixture<RemoveItemsModalContent>(html`
      <remove-items-modal-content
        .items=${items}
        .message=${''}
      ></remove-items-modal-content>
    `);

    const spy = Sinon.spy();
    el.addEventListener('confirm', spy);

    const button = el.shadowRoot?.querySelector(
      '.remove-items-btn',
    ) as HTMLInputElement;
    button?.click();

    expect(spy.calledOnce).to.be.true;
    expect(spy.args[0][0].detail.items).to.deep.equal(items);
  });
});
