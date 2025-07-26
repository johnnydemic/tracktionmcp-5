import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
  res.send("✅ MCP Server is Live");
});

app.post("/jsonrpc", async (req, res) => {
  const { method, params, id } = req.body;

  if (method === "ad_spend_and_performance") {
    const { monthly_ad_spend, meta_spend, tiktok_spend, google_spend, other_spend } = params;

    const tikTokRatio = tiktok_spend / monthly_ad_spend;
    let recommendation = "Your TikTok budget is balanced.";

    if (tikTokRatio < 0.2) {
      recommendation = "Consider increasing TikTok spend to capture more top-of-funnel demand.";
    } else if (tikTokRatio > 0.5) {
      recommendation = "You're heavily invested in TikTok — make sure ROAS justifies it.";
    }

    return res.json({
      jsonrpc: "2.0",
      result: { recommendation },
      id
    });
  }

  if (method === "business_metrics") {
    const { website_url, mrr, aov, conversion_rate, niche } = params;

    let insight = "Your conversion rate looks average.";
    if (conversion_rate < 2) {
      insight = "Your conversion rate is low — improve landing pages or optimize for mobile.";
    } else if (conversion_rate > 4) {
      insight = "Great conversion rate! Scale with similar creatives.";
    }

    return res.json({
      jsonrpc: "2.0",
      result: { insight },
      id
    });
  }

  return res.status(404).json({
    jsonrpc: "2.0",
    id,
    error: {
      code: -32601,
      message: "Method not found"
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Tracktion MCP server running on port ${PORT}`);
});
