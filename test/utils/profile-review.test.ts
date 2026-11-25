import { expect } from '@open-wc/testing';
import { ItemHit } from '@internetarchive/search-service';
import { findProfileReview } from '../../src/utils/profile-review';

const review = (reviewer: string, title: string) =>
  JSON.stringify({
    reviewtitle: title,
    reviewbody: 'body',
    stars: '3',
    reviewer,
    reviewer_itemname: `@${reviewer}`,
  });

const hitWith = (extra: Record<string, unknown>) =>
  new ItemHit({
    fields: { identifier: 'foo' },
    ...extra,
  } as any);

describe('findProfileReview', () => {
  it('uses the review object when present', () => {
    const hit = hitWith({ review: { reviewtitle: 'direct' } });
    expect(findProfileReview(hit, '@a')?.reviewtitle).to.equal('direct');
  });

  it('picks the profile owner from reviews_data', () => {
    const hit = hitWith({
      fields: {
        identifier: 'foo',
        reviews_data: [review('bot', 'bot review'), review('alice', 'hers')],
      },
    });
    expect(findProfileReview(hit, '@alice')?.reviewtitle).to.equal('hers');
    expect(findProfileReview(hit, 'Alice')?.reviewtitle).to.equal('hers');
  });

  it('matches on the itemname when the reviewer is a screenname', () => {
    const hit = hitWith({
      fields: {
        identifier: 'foo',
        reviews_data: [
          JSON.stringify({
            reviewtitle: 'named',
            reviewer: 'Alice Smith',
            reviewer_itemname: '@alice',
          }),
        ],
      },
    });
    expect(findProfileReview(hit, '@alice')?.reviewtitle).to.equal('named');
  });

  it('returns nothing without a matching reviewer or profile', () => {
    const hit = hitWith({
      fields: { identifier: 'foo', reviews_data: [review('bot', 'x')] },
    });
    expect(findProfileReview(hit, '@alice')).to.be.undefined;
    expect(findProfileReview(hit)).to.be.undefined;
  });

  it('skips malformed entries', () => {
    const hit = hitWith({
      fields: {
        identifier: 'foo',
        reviews_data: ['{nope', review('alice', 'ok')],
      },
    });
    expect(findProfileReview(hit, '@alice')?.reviewtitle).to.equal('ok');
  });
});
