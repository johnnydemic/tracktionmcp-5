app.post("/jsonrpc", async (req, res) => {
  const { method, params, id } = req.body;

  if (method === "ad_spend_and_performance") {
    const { monthly_ad_spend, meta_spend, tiktok_spend, google_spend, other_spend } = params;

    const tikTokROAS = tiktok_spend / monthly_ad_spend;
    let recommendation = "Your TikTok budget is proportionate to your overall spend.";

    if (tikTokROAS < 0.25) {
      recommendation = "Consider increasing your TikTok budget — it's underutilized compared to total spend.";
    } else if (tikTokROAS > 0.4) {
      recommendation = "You're heavily invested in TikTok — monitor ROAS closely to ensure profitability.";
    }

    return res.json({
      jsonrpc: "2.0",
      result: { recommendation },
      id
    });
  }

  if (method === "business_metrics") {
    const { website_url, mrr, aov, conversion_rate, niche } = params;

    let insight = "Your conversion rate is average for your niche.";

    if (conversion_rate < 2) {
      insight = "Your conversion rate is below average — try improving product page load speed or CTAs.";
    } else if (conversion_rate > 4) {
      insight = "Strong conversion rate! Keep iterating on what’s working.";
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
