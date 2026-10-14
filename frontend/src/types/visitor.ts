export type VisitorType =
  | "talent_partner_agency"
  | "internal_recruitment_specialist"
  | "other";

export type Industry =
  | "ai"
  | "healthtech"
  | "tech_for_good_nonprofit"
  | "finance_banking"
  | "greentech_renewable_energy"
  | "energy"
  | "retail"
  | "media_publishing"
  | "b2b";

export type Role = "full_stack" | "backend" | "frontend" | "mobile";

export type CvAsset = {
  id: string;
  industry: Industry;
  role: Role;
  filename: string;
};

export type CvResolution = {
  requestedIndustry: Industry;
  matchedIndustry: Industry;
  role: Role;
  asset: CvAsset;
  matchType: "industry_match" | "ai_default";
};

export type VisitorContextValue = {
  visitorType: VisitorType | null;
  requestedIndustry: Industry | null;
  role: Role | null;
  resolution: CvResolution | null;
  setVisitorType: (type: VisitorType) => void;
  setIndustry: (industry: Industry) => void;
  setRole: (role: Role) => void;
};

// Read-only preferences shared with non-React consumers such as GioPT.
export type VisitorProfile = Pick<VisitorContextValue,
  "visitorType" | "requestedIndustry" | "role" | "resolution"
>;
