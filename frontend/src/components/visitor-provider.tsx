"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { CvAsset, Industry, Role, VisitorContextValue, VisitorType } from "@/types/visitor";
import { cvAssets } from "@/data/cv-assets";

const VisitorStateContext = createContext<VisitorContextValue | null>(null);

export function VisitorProvider({ children, assets = cvAssets }: {
  children: ReactNode;
  assets?: readonly CvAsset[];
}) {
  const [visitorType, setVisitorTypeState] = useState<VisitorType | null>(null);
  const [requestedIndustry, setIndustryState] = useState<Industry | null>(null);
  const [role, setRoleState] = useState<Role | null>(null);
  const setVisitorType = useCallback((type: VisitorType) => {
    setVisitorTypeState(type);
    if (type === "other") {
      setIndustryState(null);
      setRoleState(null);
    }
  }, []);
  const setIndustry = useCallback((industry: Industry) => setIndustryState(industry), []);
  const setRole = useCallback((role: Role) => setRoleState(role), []);

  const value = useMemo<VisitorContextValue>(() => {
    const cvIndustry = visitorType === "other" ? "ai" : requestedIndustry;
    const cvRole = visitorType === "other" ? "full_stack" : role;
    const exactAsset = cvIndustry && cvRole
      ? assets.find(asset => asset.industry === cvIndustry && asset.role === cvRole)
      : undefined;
    const asset = exactAsset ?? (cvIndustry && cvRole
      ? assets.find(asset => asset.industry === "ai" && asset.role === cvRole)
      : undefined);
    return {
      visitorType,
      requestedIndustry,
      role,
      resolution: visitorType && asset && cvIndustry && cvRole ? {
        requestedIndustry: cvIndustry,
        matchedIndustry: asset.industry,
        role: cvRole,
        asset,
        matchType: exactAsset && visitorType !== "other" ? "industry_match" : "ai_default",
      } : null,
      setVisitorType,
      setIndustry,
      setRole,
    };
  }, [visitorType, requestedIndustry, role, assets, setVisitorType, setIndustry, setRole]);

  return <VisitorStateContext.Provider value={value}>{children}</VisitorStateContext.Provider>;
}

export function useVisitor(): VisitorContextValue {
  const context = useContext(VisitorStateContext);
  if (!context) throw new Error("useVisitor must be used within a VisitorProvider");
  return context;
}
