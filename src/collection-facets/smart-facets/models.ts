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
  getRecommendedFacets(query: string): Promise<SmartFacet[]>;
}
