import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('facets-more-content')
export class FacetsMoreContent extends LitElement {
  @property({ type: String }) content?: string;

  @property({ type: Boolean }) showMoreContent = false;

  closeClicked() {
    this.showMoreContent = false;
    // console.log('here')
  }

  private emitMoreFacetsCloseClickedEvent() {
    this.showMoreContent = false;

    // console.log(e)
    const event = new CustomEvent('moreFacetsClosed', {
      // detail: facetGroup,
    });
    this.dispatchEvent(event);
  }

  render() {
    // console.log(this.showMoreContent)
    return html`
      <section
        class="facets-more-content ${this.showMoreContent ? 'show' : 'hide'}"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              @click=${(e: Event) => {
                this.emitMoreFacetsCloseClickedEvent(e);
              }}
              class="btn btn-primary"
            >
              Save changes
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </section>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .facets-more-content {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 10; /* Sit on top */
        padding-top: 100px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
      }

      .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
      }

      .show {
        display: block;
      }
      .hide {
        display: none;
      }

      /* The Close Button */
      .close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }
    `;
  }
}
