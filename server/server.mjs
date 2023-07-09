import { server } from "./http.mjs";
import { getLocalIpv4Address } from "./ipv4.mjs";

const PORT = 8000;

getLocalIpv4Address((address) => {
  server.listen(PORT, address, () => {
    console.log(`Server running at http://${address}:${PORT}`);
  });
});
