import { createServer } from "smithery-mcp";

const tools = {
  "ad.analyze": {
    description: "Analyze marketing performance data.",
    parameters: {
      type: "object",
      properties: {
        meta_spend: { type: "number" },
        tiktok_spend: { type: "number" },
        google_spend: { type: "number" },
        mmr: { type: "number" },
        aov: { type: "number" },
        conversion_rate: { type: "number" },
        roas_goal: { type: "number" },
        niche: { type: "string" },
        website_url: { type: "string" }
      },
      required: ["meta_spend", "tiktok_spend", "google_spend", "mmr", "aov", "conversion_rate", "roas_goal", "niche", "website_url"]
    },
    handler: async (input) => {
      const { meta_spend, tiktok_spend, google_spend, mmr, aov } = input;
      return {
        message: `Processed data: Meta $${meta_spend}, TikTok $${tiktok_spend}, Google $${google_spend}, MRR $${mmr}, AOV $${aov}`
      };
    }
  }
};

createServer({ tools });
