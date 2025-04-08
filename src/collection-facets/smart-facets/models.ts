import type { FacetEventDetails, FacetOption } from '../../models';

export interface FacetRef {
  facetType: FacetOption;
  bucketKey: string;
  displayText?: string;
}

interface LabeledSmartFacet {
  label: string;
  facets: FacetRef[];
  selected?: boolean;
}

interface UnlabeledSmartFacet {
  label?: string;
  facets: [FacetRef];
  selected?: boolean;
}

export type SmartFacet = LabeledSmartFacet | UnlabeledSmartFacet;

export interface SmartFacetEvent {
  smartFacet: SmartFacet;
  details: FacetEventDetails[];
}

export type KeywordFacetMap = Record<string, SmartFacet[]>;

export interface SmartQueryHeuristic {
  /**
   * Resolves to a recommended set of facets to apply for the given query
   * @param query The search query to recommend facets for
   */
  getRecommendedFacets(query: string): Promise<SmartFacet[]>;
}
