const token = "nfp_Dh1nNofDhU1A9eDn3e6NSiPBE2MQCqHq2598";
const siteId = "ec2eb5df-61fa-4078-8334-dda87b5afaef";

async function main() {
  const res = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (Array.isArray(data) && data.length > 0) {
    const latest = data[0];
    console.log("Latest Deploy State:", latest.state);
    console.log("Context:", latest.context);
    console.log("Deploy URL:", latest.ssl_url || latest.url);
    console.log("Deploy ID:", latest.id);
  } else {
    console.log("No deploys found yet.");
  }
}
main();
