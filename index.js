import http from 'http';
import fetch from 'node-fetch';

// ✅ Add this simple /health check so Railway + Smithery validate your app
http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
  }
}).listen(8080);

console.error('🚀 Tracktion MCP Server Started');

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

export async function runServer({ tools }) {
  const readline = await import('readline');
  const rl = readline.createInterface({ input: process.stdin });

  console.error('🧠 MCP listening for tool calls...');

  rl.on('line', async (input) => {
    try {
      const req = JSON.parse(input);
      const tool = tools.find(t => t.name === req.method);
      if (!tool) return console.error("Unknown method:", req.method);
      const result = await tool.execute(req.params, { config: process.env });
      console.log(JSON.stringify({ jsonrpc: "2.0", id: req.id, result }));
    } catch (err) {
      console.error("Error:", err);
    }
  });
}

runServer({ tools });
