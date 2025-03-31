import { AgoraDocument } from "../models/Agora";

const mergeMap: Record<string, string> = {
  risk_factors_security_cybersecurity: "risk_factors_security",
  risk_factors_security_dissemination: "risk_factors_security",
  risk_factors_reliability_robustness: "risk_factors_reliability",
  applications_government_military_and_public_safety: "applications_government",
  applications_government_judicial_and_law_enforcement:
    "applications_government",
  applications_government_benefits_and_welfare: "applications_government",
  applications_government_other_applications_unspecified:
    "applications_government",
  applications_medicine_life_sciences_and_public_health:
    "applications_healthcare",
  applications_business_services_and_analytics: "applications_business_finance",
  applications_finance_and_investment: "applications_business_finance",
  applications_consumer_goods: "applications_business_finance",
  applications_sales_retail_and_customer_relations:
    "applications_business_finance",
  applications_manufacturing_and_process_automation:
    "applications_infrastructure",
  applications_energy_and_utilities: "applications_infrastructure",
  applications_networking_and_telecommunications: "applications_infrastructure",
  applications_construction_and_field_services: "applications_infrastructure",
  applications_transportation: "applications_infrastructure",
  applications_security: "applications_infrastructure",
  applications_broadcasting_and_media_production:
    "applications_media_entertainment",
  applications_arts_sports_leisure_travel_and_lifestyle:
    "applications_media_entertainment",
  applications_agriculture_and_resource_extraction: "applications_agriculture",
  applications_education: "applications_education",
  applications_security_cybersecurity: "applications_security",
  applications_security_dissemination: "applications_security",
};

export const prepareYearData = (
  docs: AgoraDocument[],
  prefix: string
): { date: Date; category: string; value: number }[] => {
  if (!docs || docs.length === 0) return [];

  const columns = Object.keys(docs[0]).filter((k) =>
    k.startsWith(prefix + "_")
  );

  const aggregator = new Map<number, Map<string, number>>();

  docs.forEach((doc) => {
    const d = doc.proposed_date;
    if (!d) return;

    const year = new Date(d).getUTCFullYear();
    if (!year || isNaN(year)) return;

    columns.forEach((catCol) => {
      if ((doc as unknown as Record<string, boolean>)[catCol]) {
        const mergedCol = mergeMap[catCol] ?? catCol;
        const catName = mergedCol.replace(prefix + "_", "");

        if (!aggregator.has(year)) {
          aggregator.set(year, new Map());
        }

        const catMap = aggregator.get(year)!;
        catMap.set(catName, (catMap.get(catName) ?? 0) + 1);
      }
    });
  });

  const out: { date: Date; category: string; value: number }[] = [];

  for (const [year, catMap] of aggregator.entries()) {
    const dateVal = new Date(`${year}-01-01`);
    for (const [cat, val] of catMap.entries()) {
      out.push({ date: dateVal, category: cat, value: val });
    }
  }

  return out.sort((a, b) => a.date.getTime() - b.date.getTime());
};
