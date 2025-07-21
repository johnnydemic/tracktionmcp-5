import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

console.log('🚀 Tracktion MCP Server Started');

const tools = [
  {
    name: 'get-monthly-spend-meta',
    parameters: {
      ad_account_id: { type: 'string' }
    },
    execute: async ({ ad_account_id }, context) => {
      const token = context.config.META_ACCESS_TOKEN;
      const res = await fetch(`https://graph.facebook.com/v19.0/${ad_account_id}/insights?fields=spend&time_range[since]=2024-07-01&time_range[until]=2024-07-31`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      return { spend: json?.data?.[0]?.spend || "Unavailable" };
    }
  },
  {
    name: 'get-monthly-spend-tiktok',
    parameters: {
      advertiser_id: { type: 'string' }
    },
    execute: async ({ advertiser_id }, context) => {
      const token = context.config.TIKTOK_ACCESS_TOKEN;
      const res = await fetch("https://business-api.tiktok.com/open_api/v1.2/report/ad/get/", {
        method: "POST",
        headers: {
          "Access-Token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          advertiser_id,
          report_type: "BASIC",
          dimensions: ["stat_time_day"],
          metrics: ["spend"],
          start_date: "2024-07-01",
          end_date: "2024-07-31"
        })
      });
      const json = await res.json();
      return { spend: json?.data?.list?.[0]?.spend || "Unavailable" };
    }
  },
  {
    name: 'get-business-profile',
    parameters: {
      data: { type: 'object' }
    },
    execute: async ({ data }) => {
      return {
        received: data,
        summary: "Business profile data received for analysis."
      };
    }
  }
];

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`MCP server listening on port ${port}`);
});