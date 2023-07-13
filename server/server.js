import { createServer } from "http";
import { createActions } from "./app/actions.js";
import { createEndpoints } from "./app/endpoints.js";
import { createState } from "./app/state.js";
import { getLocalIpv4Address } from "./lib/ipv4.js";
import { broadcast, onConnect, onDisconnect, upgrade } from "./lib/socket.js";

const port = 8000;

getLocalIpv4Address((address) => {
  const { state, onStateChange, setState } = createState();
  onStateChange(() => broadcast(state));

  const actions = createActions({ address, port, state, setState });
  onConnect(actions.addPlayer);
  onDisconnect(actions.removePlayer);

  const handleRequest = createEndpoints({ actions });
  const server = createServer(handleRequest);
  server.on("error", console.error);
  server.on("upgrade", upgrade);
  server.listen(port, () => {
    console.debug(`Server running at http://${address}:${port}`);
  });
});
