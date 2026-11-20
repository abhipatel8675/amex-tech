export type CaseStudyFacts = {
  industry?: string;
  country?: string;
  year?: string;
  duration?: string;
  quote?: { text: string; name: string; role?: string };
};

// Keyed by portfolio slug. Fill in only facts and quotes the client has confirmed.
export const caseStudyFacts: Record<string, CaseStudyFacts> = {};
