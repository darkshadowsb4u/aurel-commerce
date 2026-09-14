const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const token = "nfp_Dh1nNofDhU1A9eDn3e6NSiPBE2MQCqHq2598";
const siteName = "aurel-commerce-" + Math.floor(100000 + Math.random() * 900000);

async function main() {
  console.log(`Creating Netlify site: ${siteName}...`);

  try {
    const res = await fetch("https://api.netlify.com/api/v1/sites", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: siteName }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Site creation response:", data);
      throw new Error(`Netlify API Error ${res.status}: ${data.message || JSON.stringify(data)}`);
    }

    console.log(`Site Created! Site ID: ${data.site_id}`);
    console.log(`Live Site URL: ${data.ssl_url || data.url}`);

    // Create .netlify/state.json
    const netlifyDir = path.join(__dirname, "..", ".netlify");
    if (!fs.existsSync(netlifyDir)) {
      fs.mkdirSync(netlifyDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(netlifyDir, "state.json"),
      JSON.stringify({ siteId: data.site_id }, null, 2)
    );

    console.log("Triggering Netlify production deployment...");
    const output = execSync(`pnpm exec netlify deploy --prod --auth ${token} --site ${data.site_id}`, {
      encoding: "utf8",
      stdio: "pipe",
    });

    console.log("Deployment output:\n", output);
    console.log(`\nLIVE NETLIFY DEPLOYMENT SUCCESSFUL!`);
    console.log(`Live URL: ${data.ssl_url || data.url}`);
  } catch (err) {
    console.error("Deployment failed:", err);
    process.exit(1);
  }
}

main();
