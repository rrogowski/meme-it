import { lookup } from "dns";
import { hostname } from "os";

export const getLocalIpv4Address = (onResult) => {
  lookup(hostname(), (error, address) => {
    if (error) {
      console.error(error);
      return;
    }
    onResult(address);
  });
};
