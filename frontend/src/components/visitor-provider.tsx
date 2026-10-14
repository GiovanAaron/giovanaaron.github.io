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
    const exactAsset = requestedIndustry && role
      ? assets.find(asset => asset.industry === requestedIndustry && asset.role === role)
      : undefined;
    const asset = exactAsset ?? (requestedIndustry && role
      ? assets.find(asset => asset.industry === "ai" && asset.role === role)
      : undefined);
    return {
      visitorType,
      requestedIndustry,
      role,
      resolution: asset && requestedIndustry && role ? {
        requestedIndustry,
        matchedIndustry: asset.industry,
        role,
        asset,
        matchType: exactAsset ? "industry_match" : "ai_default",
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
