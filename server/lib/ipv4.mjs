import { lookup } from "dns";
import { hostname } from "os";

export const getLocalIpv4Address = (onResult) => {
  const osHost = hostname();
  lookup(osHost, { family: "IPv4" }, (error, address) => {
    if (error) {
      console.error(error);
      return;
    }
    onResult(address);
  });
};
