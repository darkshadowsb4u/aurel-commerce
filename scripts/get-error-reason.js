const token = "nfp_Dh1nNofDhU1A9eDn3e6NSiPBE2MQCqHq2598";
const deployId = "6aa752a23dd492869155a882";

async function main() {
  const res = await fetch(`https://api.netlify.com/api/v1/deploys/${deployId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  console.log("State:", data.state);
  console.log("Error Message:", data.error_message);
  console.log("Summary:", JSON.stringify(data.summary, null, 2));
}
main();
