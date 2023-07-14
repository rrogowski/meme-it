import { server } from "./http.js";
import { getLocalIpv4Address } from "./ipv4.js";
import { broadcastState } from "./socket.js";
import { subscribe } from "./store.js";

const port = 8000;
server.listen(port, async () => {
  const localIpv4Address = await getLocalIpv4Address();
  console.log(`Server running at http://${localIpv4Address}:${port}`);
  subscribe(() => broadcastState());
});
