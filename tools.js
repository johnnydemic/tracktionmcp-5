module.exports = [
  {
    type: "function",
    function: {
      name: "ad_spend_and_performance",
      description: "Breakdown of monthly ad spend across platforms",
      parameters: {
        type: "object",
        properties: {
          monthly_ad_spend: { type: "number" },
          meta_spend: { type: "number" },
          tiktok_spend: { type: "number" },
          google_spend: { type: "number" },
          other_spend: { type: "number" }
        },
        required: ["monthly_ad_spend"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "business_metrics",
      description: "Key business metrics",
      parameters: {
        type: "object",
        properties: {
          website_url: { type: "string" },
          mrr: { type: "number" },
          aov: { type: "number" },
          conversion_rate: { type: "number" },
          niche: { type: "string" }
        },
        required: ["website_url"]
      }
    }
  }
];
