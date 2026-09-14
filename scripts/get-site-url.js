const token = "nfp_Dh1nNofDhU1A9eDn3e6NSiPBE2MQCqHq2598";
const siteId = "ec2eb5df-61fa-4078-8334-dda87b5afaef";

async function main() {
  const res = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  console.log("Site Name:", data.name);
  console.log("SSL URL:", data.ssl_url);
  console.log("URL:", data.url);
  console.log("Admin URL:", data.admin_url);
}
main();
