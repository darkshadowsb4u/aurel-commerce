const token = "nfp_Dh1nNofDhU1A9eDn3e6NSiPBE2MQCqHq2598";
const deployId = "6aa75002607b7958ce633d3a";

async function main() {
  const res = await fetch(`https://api.netlify.com/api/v1/deploys/${deployId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  console.log("Error message:", data.error_message);
  console.log("Deploy details:", { state: data.state, summary: data.summary });
}
main();
