import { AgoraDocument } from "../models/Agora";
import {YearlyActivityData} from "../models/Chart";

const mergeMap: Record<string, string> = {
  risk_factors_security_cybersecurity: "risk_factors_security",
  risk_factors_security_dissemination: "risk_factors_security",
  risk_factors_reliability_robustness: "risk_factors_reliability",
  // government-related categories
  applications_government_military_and_public_safety: "applications_government",
  applications_government_judicial_and_law_enforcement:
    "applications_government",
  applications_government_benefits_and_welfare: "applications_government",
  applications_government_other_applications_unspecified:
    "applications_government",
    // healthcare-related categories
  applications_medicine_life_sciences_and_public_health:
    "applications_healthcare",
  // business-related categories
  applications_business_services_and_analytics: "applications_business_finance",
  applications_finance_and_investment: "applications_business_finance",
  applications_consumer_goods: "applications_business_finance",
  applications_sales_retail_and_customer_relations:
    "applications_business_finance",
    // infrastructure-related categories
  applications_manufacturing_and_process_automation:
    "applications_infrastructure",
  applications_energy_and_utilities: "applications_infrastructure",
  applications_networking_and_telecommunications: "applications_infrastructure",
  applications_construction_and_field_services: "applications_infrastructure",
  applications_transportation: "applications_infrastructure",
  applications_security: "applications_infrastructure",
  // media-related categories
  applications_broadcasting_and_media_production:
    "applications_media_entertainment",
  applications_arts_sports_leisure_travel_and_lifestyle:
    "applications_media_entertainment",
    // agriculture-related categories
  applications_agriculture_and_resource_extraction: "applications_agriculture",
 
};

export const prepareYearlyTopics = (
  docs: AgoraDocument[],
  prefix: string
): { date: string; category: string; value: number }[] => {
  if (!docs || docs.length === 0) return [];

  const columns = Object.keys(docs[0]).filter((k) =>
    k.startsWith(prefix + "_")
  );

  const aggregator = new Map<string, Map<string, number>>();


  docs.forEach((doc) => {
    const d = doc.most_recent_activity_date;
    if (!d) return;

    const year = d.split("-")[0]; 
    if (!year) return;

    columns.forEach((catCol) => {
      if ((doc as unknown as Record<string, boolean>)[catCol]) {
        const mergedCol = mergeMap[catCol] ?? catCol;
        const catName = mergedCol.replace(prefix + "_", "");

        const yearKey = `${year}-01-01`; 
        if (!aggregator.has(yearKey)) {
          aggregator.set(yearKey, new Map());
        }

        const catMap = aggregator.get(yearKey)!;
        catMap.set(catName, (catMap.get(catName) ?? 0) + 1);
      }
    });
  });

  const out: { date: string; category: string; value: number }[] = [];

  for (const [yearKey, catMap] of aggregator.entries()) {
    for (const [cat, val] of catMap.entries()) {
      out.push({ date: yearKey, category: cat, value: val });
    }
  }

  
  return out.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const prepareYearlyActivity = (
  docs: AgoraDocument[]
): {
  data: YearlyActivityData;
  categories: string[];
} => {
  const categories = ["Enacted", "Proposed", "Defunct"]; 
  const groupedData: Record<string, Record<string, number>> = {};

  for (const doc of docs) {
    if (!doc.most_recent_activity_date) {
      // console.log("Missing proposed_date:", doc);
      continue;
    }

    const year = doc.most_recent_activity_date.split("-")[0];

  

    const yearKey = `${year}-01-01`;
    const activity = doc.most_recent_activity;

    if (!categories.includes(activity)) {
      console.warn(`Unexpected activity type: ${activity}`, doc);
      continue;
    }

    if (!groupedData[yearKey]) {
      groupedData[yearKey] = { Enacted: 0, Proposed: 0, Defunct: 0 };
    }

    groupedData[yearKey][activity]++;
  }

  
  const data = Object.entries(groupedData)
    .map(([date, counts]) => ({
      date, 
      Enacted: counts["Enacted"] ?? 0, 
      Proposed: counts["Proposed"] ?? 0,
      Defunct: counts["Defunct"] ?? 0,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return { data, categories };
};

export const prepareGroupedBarChartData = (
  docs: AgoraDocument[]
): { year: string; categories: { category: string; value: number }[] }[] => {
  console.log("in prepare docs", docs)
  if (!docs || docs.length === 0) return [];

  const categories = ["Enacted", "Proposed", "Defunct"]; // Define the categories
  const groupedData: Record<string, Record<string, number>> = {};

  
  docs.forEach((doc) => {
    if (!doc.proposed_date || !doc.most_recent_activity) {
      console.log("Document missing required fields:", doc);
      return;
    }

    const year = doc.proposed_date.split("-")[0]; // Extract the year
    const activity = doc.most_recent_activity;

    if (!categories.includes(activity)) {
      console.log(`Unexpected activity type: ${activity}`, doc);
      return;
    }

    if (!groupedData[year]) {
      groupedData[year] = { Enacted: 0, Proposed: 0, Defunct: 0 };
    }

    groupedData[year][activity]++;
  });


  const transformedData = Object.entries(groupedData)
    .map(([year, counts]) => ({
      year,
      categories: categories.map((category) => ({
        category,
        value: counts[category] ?? 0,
      })),
    }))
    .sort((a, b) => parseInt(a.year) - parseInt(b.year));

  return transformedData;
};