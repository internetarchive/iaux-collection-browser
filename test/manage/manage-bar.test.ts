import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import Sinon from 'sinon';
import '../../src/manage/manage-bar';
import '../../src/manage/remove-items-modal-content';
import {
  ModalManager,
  ModalManagerInterface,
} from '@internetarchive/modal-manager';
import '@internetarchive/modal-manager';
import { msg } from '@lit/localize';
import type { ManageBar } from '../../src/manage/manage-bar';
import type { PageElementName } from '@internetarchive/search-service';
import type { RemoveItemsModalContent } from '../../src/manage/remove-items-modal-content';

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
    const modalManager = await fixture<ModalManager>(
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

    expect(showModalSpy.callCount).to.equal(1);
    expect(el.modalManager?.classList.contains('remove-items')).to.be;
    expect(showModalSpy.args[0][0].config.title?.values[0]).to.equal(
      msg('Are you sure you want to remove these items?'),
    );
    expect(showModalSpy.args[0][0].customModalContent).to.exist;
  });

  it('shows selected items count in remove button', async () => {
    const el = await fixture<ManageBar>(html`
      <manage-bar
        .selectedItems=${[
          { identifier: '1', title: 'Item 1' },
          { identifier: '2', title: 'Item 2' },
          { identifier: '3', title: 'Item 3' },
        ]}
      ></manage-bar>
    `);
    const removeBtn = el.shadowRoot?.querySelector('.ia-button.danger');
    expect(removeBtn?.textContent?.trim()).to.include('(3)');
  });

  it('Item Manager button is disabled when removeAllowed is false', async () => {
    const el = await fixture<ManageBar>(
      html`<manage-bar showItemManageButton></manage-bar>`,
    );
    expect(el.shadowRoot?.querySelector('.ia-button.warning:disabled')).to
      .exist;

    el.removeAllowed = true;
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.ia-button.warning:disabled')).not.to
      .exist;
  });

  it('emits manageItems event when Item Manager button clicked', async () => {
    const spy = Sinon.spy();
    const el = await fixture<ManageBar>(html`
      <manage-bar
        showItemManageButton
        removeAllowed
        @manageItems=${spy}
      ></manage-bar>
    `);
    const manageBtn = el.shadowRoot?.querySelector(
      '.ia-button.warning',
    ) as HTMLButtonElement;
    expect(manageBtn).to.exist;
    manageBtn.click();
    expect(spy.callCount).to.equal(1);
  });

  it('emits removeItems event when modal confirm is clicked', async () => {
    const modalManager = await fixture<ModalManager>(
      html`<modal-manager></modal-manager>`,
    );
    const removeItemsSpy = Sinon.spy();
    const el = await fixture<ManageBar>(html`
      <manage-bar
        .modalManager=${modalManager}
        .selectedItems=${[{ identifier: '1', title: 'Item 1' }]}
        removeAllowed
        @removeItems=${removeItemsSpy}
      ></manage-bar>
    `);
    await el.updateComplete;

    const showModalSpy = Sinon.spy(
      el.modalManager as ModalManagerInterface,
      'showModal',
    );
    (
      el.shadowRoot?.querySelector('.ia-button.danger') as HTMLButtonElement
    ).click();

    const contentEl = (await fixture(
      showModalSpy.args[0][0].customModalContent!,
    )) as RemoveItemsModalContent;
    (
      contentEl.shadowRoot?.querySelector(
        '.remove-items-btn',
      ) as HTMLButtonElement
    ).click();

    expect(removeItemsSpy.callCount).to.equal(1);
  });

  describe('profileElement modal messages', () => {
    async function openModalContent(
      profileElement: string,
      itemCount = 1,
    ): Promise<RemoveItemsModalContent> {
      const modalManager = await fixture<ModalManager>(
        html`<modal-manager></modal-manager>`,
      );
      const items = Array.from({ length: itemCount }, (_, i) => ({
        identifier: String(i + 1),
        title: `Item ${i + 1}`,
      }));
      const el = await fixture<ManageBar>(html`
        <manage-bar
          .selectedItems=${items}
          .profileElement=${profileElement as PageElementName}
          removeAllowed
        ></manage-bar>
      `);
      el.modalManager = modalManager as ModalManagerInterface;
      await el.updateComplete;

      const showModalSpy = Sinon.spy(
        el.modalManager as ModalManagerInterface,
        'showModal',
      );
      (
        el.shadowRoot?.querySelector('.ia-button.danger') as HTMLButtonElement
      ).click();

      return (await fixture(
        showModalSpy.args[0][0].customModalContent!,
      )) as RemoveItemsModalContent;
    }

    it('shows uploads-specific message for profileElement=uploads', async () => {
      const contentEl = await openModalContent('uploads');
      expect(contentEl.message).to.include('uploads list');
    });

    it('shows web archives message for profileElement=web_archives', async () => {
      const contentEl = await openModalContent('web_archives');
      expect(contentEl.message).to.include('web archives list');
    });

    it('shows favorites message for profileElement=favorites', async () => {
      const contentEl = await openModalContent('favorites');
      expect(contentEl.message).to.include('favorites list');
    });

    it('shows no message for unmapped profileElement (e.g. reviews)', async () => {
      const contentEl = await openModalContent('reviews');
      expect(contentEl.message).to.equal('');
      expect(contentEl.shadowRoot?.querySelector('.message')).not.to.exist;
    });

    it('uses "this item" for a single selected item', async () => {
      const contentEl = await openModalContent('uploads', 1);
      expect(contentEl.message).to.include('this item');
    });

    it('uses "these items" for multiple selected items', async () => {
      const contentEl = await openModalContent('uploads', 2);
      expect(contentEl.message).to.include('these items');
    });
  });

  it('showRemoveItemsProcessingModal shows processing modal', async () => {
    const modalManager = await fixture<ModalManager>(
      html`<modal-manager></modal-manager>`,
    );
    const el = await fixture<ManageBar>(html`
      <manage-bar .modalManager=${modalManager}></manage-bar>
    `);
    const showModalSpy = Sinon.spy(
      el.modalManager as ModalManagerInterface,
      'showModal',
    );

    el.showRemoveItemsProcessingModal();

    expect(showModalSpy.callCount).to.equal(1);
    expect(showModalSpy.args[0][0].config.showProcessingIndicator).to.be.true;
    expect(showModalSpy.args[0][0].config.title?.values[0]).to.equal(
      msg('Removing selected items...'),
    );
  });

  it('showRemoveItemsErrorModal shows error modal', async () => {
    const modalManager = await fixture<ModalManager>(
      html`<modal-manager></modal-manager>`,
    );
    const el = await fixture<ManageBar>(html`
      <manage-bar .modalManager=${modalManager}></manage-bar>
    `);
    const showModalSpy = Sinon.spy(
      el.modalManager as ModalManagerInterface,
      'showModal',
    );

    el.showRemoveItemsErrorModal();

    expect(showModalSpy.callCount).to.equal(1);
    expect(showModalSpy.args[0][0].config.showProcessingIndicator).to.be.false;
    expect(showModalSpy.args[0][0].config.title?.values[0]).to.equal(
      msg('Error: unable to remove items'),
    );
  });
});
