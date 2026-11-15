// Cloudflare Worker: calls the prospecting scheduler on amextechnology.com every
// few minutes. Each source decides on the site whether it is due, so this only
// needs to tick. Vercel's own cron can't run this often on every plan.
export default {
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(
      fetch(env.TARGET_URL, { headers: { authorization: `Bearer ${env.CRON_SECRET}` } }).then(async (res) => {
        if (!res.ok) console.error("prospects tick", res.status, (await res.text()).slice(0, 300));
      }),
    );
  },
};
