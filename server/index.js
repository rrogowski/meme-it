import { server } from "./http.js";
import { getLocalIpv4Address, getNetworkIpv4Address } from "./ipv4.js";
import { broadcastState } from "./socket.js";
import { subscribe } from "./store.js";

const port = 9000;
server.listen(port, () => {
  console.log("Server started");
  console.log(`  Local:   http://${getLocalIpv4Address()}:${port}`);
  console.log(`  Network: http://${getNetworkIpv4Address()}:${port}`);
  subscribe(() => broadcastState());
});
