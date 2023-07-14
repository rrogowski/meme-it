import { lookup } from "dns";
import { hostname } from "os";

export const getLocalIpv4Address = () => {
  return new Promise((resolve, reject) => {
    const osHost = hostname();
    lookup(osHost, { family: "IPv4" }, (error, address) => {
      if (error === null) {
        resolve(address);
        return;
      }
      console.error(error);
      reject(error);
    });
  });
};
