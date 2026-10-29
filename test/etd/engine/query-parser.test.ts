import { expect } from '@open-wc/testing';
import {
  institutionValues,
  parseQuery,
} from '../../../src/etd/engine/query-parser';

const term = (text: string, prefix?: string) =>
  prefix ? { op: 'term', text, prefix } : { op: 'term', text };

describe('parseQuery', () => {
  it('ORs adjacent words', () => {
    expect(parseQuery('sea ice').tree).to.deep.equal({
      op: 'or',
      left: term('sea'),
      right: term('ice'),
    });
  });

  it('reads uppercase AND, and leaves lowercase "and" as a word', () => {
    expect(parseQuery('sea AND ice').tree).to.deep.equal({
      op: 'and',
      left: term('sea'),
      right: term('ice'),
    });
    expect(parseQuery('sea and ice').tree).to.deep.equal({
      op: 'or',
      left: { op: 'or', left: term('sea'), right: term('and') },
      right: term('ice'),
    });
  });

  it('subtracts NOT from what comes before it', () => {
    expect(parseQuery('climate NOT model').tree).to.deep.equal({
      op: 'not',
      left: term('climate'),
      right: term('model'),
    });
  });

  it('reads a leading NOT as subtracting from what follows', () => {
    // The page itself throws on this shape.
    expect(parseQuery('NOT model climate').tree).to.deep.equal({
      op: 'not',
      left: term('climate'),
      right: term('model'),
    });
  });

  it('groups with parentheses', () => {
    expect(parseQuery('(sea OR lake) AND ice').tree).to.deep.equal({
      op: 'and',
      left: { op: 'or', left: term('sea'), right: term('lake') },
      right: term('ice'),
    });
  });

  it('keeps quoted text as one phrase, even unterminated', () => {
    expect(parseQuery('"sea ice"').tree).to.deep.equal({
      op: 'phrase',
      text: 'sea ice',
    });
    expect(parseQuery('"sea ice').tree).to.deep.equal({
      op: 'phrase',
      text: 'sea ice',
    });
  });

  it('searches one text field for title:, creator: and author:', () => {
    expect(parseQuery('title:ice').tree).to.deep.equal(term('ice', 't:'));
    expect(parseQuery('author:okafor').tree).to.deep.equal(
      term('okafor', 'c:'),
    );
    expect(parseQuery('creator:"ada okafor"').tree).to.deep.equal({
      op: 'phrase',
      text: 'ada okafor',
      prefix: 'c:',
    });
  });

  it('lifts facet fields out of the text query as filters', () => {
    const parsed = parseQuery(
      'ice year:[2000 TO 2010] country:"united states"',
    );
    expect(parsed.tree).to.deep.equal(term('ice'));
    expect(parsed.filters).to.deep.equal([
      { negated: false, field: 'year', value: '[2000 TO 2010]' },
      { negated: false, field: 'country', value: '"united states"' },
    ]);
  });

  it('negates a filter with NOT rather than the text query', () => {
    const parsed = parseQuery('ice NOT has:abstract');
    expect(parsed.tree).to.deep.equal(term('ice'));
    expect(parsed.filters).to.deep.equal([
      { negated: true, field: 'has', value: 'abstract' },
    ]);
  });

  it('turns field:* into a has: filter', () => {
    expect(parseQuery('ice abstract:*').filters).to.deep.equal([
      { negated: false, field: 'has', value: 'abstract' },
    ]);
  });

  it('expands a known institution acronym to its full names', () => {
    expect(parseQuery('inst:MIT').tree).to.deep.equal({
      op: 'or',
      left: term('MIT', 'i:'),
      right: {
        op: 'phrase',
        text: 'massachusetts institute of technology',
        prefix: 'i:',
      },
    });
  });

  describe('with the institution list', () => {
    // As the engine resolves them: 'mit' is known (MIT's id), 'nowhere' isn't.
    const institutions = new Map([
      ['mit', new Set([27])],
      ['university of zagreb', new Set([3])],
      ['nowhere', new Set<number>()],
    ]);

    it('lifts a known inst: value out as a filter, leaving the words', () => {
      const parsed = parseQuery('inst:mit robotics', { institutions });
      expect(parsed.tree).to.deep.equal(term('robotics'));
      expect(parsed.filters).to.deep.equal([
        { negated: false, field: 'inst', value: 'mit' },
      ]);
    });

    it('takes a quoted name, under either field word', () => {
      const parsed = parseQuery('institution:"university of zagreb"', {
        institutions,
      });
      expect(parsed.tree).to.be.null;
      expect(parsed.filters).to.deep.equal([
        { negated: false, field: 'inst', value: 'university of zagreb' },
      ]);
    });

    it('negates it after NOT', () => {
      expect(
        parseQuery('robotics NOT inst:mit', { institutions }).filters,
      ).to.deep.equal([{ negated: true, field: 'inst', value: 'mit' }]);
    });

    it('searches an unknown value as text, expansions and all', () => {
      expect(parseQuery('inst:nowhere', { institutions }).tree).to.deep.equal(
        term('nowhere', 'i:'),
      );
      // Without the list, inst:mit is the text search it always was.
      expect(parseQuery('inst:mit').filters).to.deep.equal([]);
    });
  });

  it('keeps an ORCID iD whole, as a phrase', () => {
    expect(parseQuery('orcid:0000-0002-3449-7508').tree).to.deep.equal({
      op: 'phrase',
      text: '0000-0002-3449-7508',
      prefix: 'o:',
    });
  });

  it('has no tree for an empty or filter-only query', () => {
    expect(parseQuery('   ').tree).to.be.null;
    expect(parseQuery('year:2020').tree).to.be.null;
  });
});

describe('institutionValues', () => {
  it('finds each inst: and institution: value, unquoted, once', () => {
    expect(
      institutionValues(
        'robotics inst:mit OR institution:"University of Zagreb" inst:mit',
      ),
    ).to.deep.equal(['mit', 'University of Zagreb']);
  });

  it('skips inst:* (has an institution) and words merely ending in inst:', () => {
    expect(institutionValues('inst:* firstinst:mit')).to.deep.equal([]);
  });
});
