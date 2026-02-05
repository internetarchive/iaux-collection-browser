import { fixture } from '@open-wc/testing-helpers';
import { describe, it, expect } from 'vitest';
import { html } from 'lit';
import Sinon from 'sinon';
import '../../src/manage/manage-bar';
import {
  ModalManager,
  ModalManagerInterface,
} from '@internetarchive/modal-manager';
import '@internetarchive/modal-manager';
import { msg } from '@lit/localize';
import type { ManageBar } from '../../src/manage/manage-bar';

describe('Manage bar', () => {
  it('renders basic component', async () => {
    const el = await fixture<ManageBar>(html`<manage-bar></manage-bar>`);

    expect(el.shadowRoot?.querySelector('.manage-label')).to.exist;
    expect(el.shadowRoot?.querySelector('.manage-buttons')).to.exist;
    expect(el.shadowRoot?.querySelector('.ia-button.dark')).to.exist;
    expect(el.shadowRoot?.querySelector('.ia-button.danger')).to.exist;
  });

  it('can set the label', async () => {
    const el = await fixture<ManageBar>(
      html`<manage-bar label="foo bar"></manage-bar>`,
    );
    expect(el.shadowRoot?.querySelector('.manage-label')?.textContent).to.equal(
      'foo bar',
    );
  });

  it('does not include Select All/Unselect All buttons by default', async () => {
    const el = await fixture<ManageBar>(html`<manage-bar></manage-bar>`);
    expect(el.shadowRoot?.querySelector('.select-all-btn')).not.to.exist;
    expect(el.shadowRoot?.querySelector('.unselect-all-btn')).not.to.exist;
  });

  it('does not render item manager button except /search/ page', async () => {
    const el = await fixture<ManageBar>(html`<manage-bar></manage-bar>`);
    expect(el.shadowRoot?.querySelector('.ia-button.warning')).not.to.exist;
  });

  it('render item manager button for /search/ page', async () => {
    const el = await fixture<ManageBar>(
      html`<manage-bar showItemManageButton></manage-bar>`,
    );
    expect(el.shadowRoot?.querySelector('.ia-button.warning')).to.exist;
  });

  it('includes Select All button when requested', async () => {
    const el = await fixture<ManageBar>(
      html`<manage-bar showSelectAll></manage-bar>`,
    );
    expect(el.shadowRoot?.querySelector('.select-all-btn')).to.exist;
  });

  it('includes Unselect All button when requested', async () => {
    const el = await fixture<ManageBar>(
      html`<manage-bar showUnselectAll></manage-bar>`,
    );
    expect(el.shadowRoot?.querySelector('.unselect-all-btn')).to.exist;
  });

  it('default and toggle state of remove button', async () => {
    const el = await fixture<ManageBar>(html`<manage-bar></manage-bar>`);

    expect(el.shadowRoot?.querySelector('.ia-button.danger:disabled')).to.exist;

    el.removeAllowed = true;
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.ia-button.danger:disabled')).to.not
      .exist;
  });

  it('emits event when Cancel button clicked', async () => {
    const spy = Sinon.spy();
    const el = await fixture<ManageBar>(
      html`<manage-bar @cancel=${spy}></manage-bar>`,
    );

    const cancelBtn = el.shadowRoot?.querySelector(
      '.ia-button.dark',
    ) as HTMLButtonElement;
    expect(cancelBtn).to.exist;

    cancelBtn.click();
    expect(spy.callCount).to.equal(1);
  });

  it('emits event when Select All button clicked', async () => {
    const spy = Sinon.spy();
    const el = await fixture<ManageBar>(
      html`<manage-bar showSelectAll @selectAll=${spy}></manage-bar>`,
    );

    const selectAllBtn = el.shadowRoot?.querySelector(
      '.select-all-btn',
    ) as HTMLButtonElement;
    expect(selectAllBtn).to.exist;

    selectAllBtn.click();
    expect(spy.callCount).to.equal(1);
  });

  it('emits event when Unselect All button clicked', async () => {
    const spy = Sinon.spy();
    const el = await fixture<ManageBar>(
      html`<manage-bar showUnselectAll @unselectAll=${spy}></manage-bar>`,
    );

    const unselectAllBtn = el.shadowRoot?.querySelector(
      '.unselect-all-btn',
    ) as HTMLButtonElement;
    expect(unselectAllBtn).to.exist;

    unselectAllBtn.click();
    expect(spy.callCount).to.equal(1);
  });

  it('opens the remove items modal when showRemoveItemsModal is clicked', async () => {
    const modalManager = await fixture<ModalManagerInterface>(
      html`<modal-manager></modal-manager>`,
    );

    const el = await fixture<ManageBar>(html`
      <manage-bar
        .modalManager=${modalManager}
        .selectedItems=${[{ identifier: '1', title: 'Item 1' }]}
        removeAllowed
      ></manage-bar>
    `);
    await el.updateComplete;

    const removeButton = el.shadowRoot?.querySelector(
      '.ia-button.danger',
    ) as HTMLButtonElement;
    expect(removeButton).to.exist;

    const showModalSpy = Sinon.spy(
      el.modalManager as ModalManagerInterface,
      'showModal',
    );

    await el.updateComplete;
    removeButton?.click();

    console.log(showModalSpy.args[0][0].config.title?.values[0]);

    expect(showModalSpy.callCount).to.equal(1);
    expect(el.modalManager?.classList.contains('remove-items')).to.be.true;
    expect(showModalSpy.args[0][0].config.title?.values[0]).to.equal(
      msg('Are you sure you want to remove these items?'),
    );
    expect(showModalSpy.args[0][0].customModalContent).to.exist;
  });
});
