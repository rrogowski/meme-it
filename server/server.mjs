import { createServer } from "http";
import { createActions } from "./app/actions.mjs";
import { createEndpoints } from "./app/endpoints.mjs";
import { createState } from "./app/state.mjs";
import { getLocalIpv4Address } from "./lib/ipv4.mjs";
import { broadcast, onConnect, onDisconnect, upgrade } from "./lib/socket.mjs";

const port = 8000;

getLocalIpv4Address((address) => {
  const { state, onStateChange, setState } = createState();
  onStateChange(() => broadcast(state));

  const actions = createActions({ address, port, state, setState });
  onConnect(actions.addPlayer);
  onDisconnect(actions.removePlayer);

  const handleRequest = createEndpoints({ actions });
  const server = createServer(handleRequest);
  server.on("upgrade", upgrade);
  server.listen(port, () => {
    console.debug(`Server running at http://${address}:${port}`);
  });
});
