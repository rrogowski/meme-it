import { networkInterfaces } from "node:os";

export const getLocalIpv4Address = () => {
  const interfaces = Object.values(networkInterfaces()).flat();
  const localIpv4Interface = interfaces.find(({ family, internal }) => {
    return family === "IPv4" && internal;
  });
  return localIpv4Interface?.address ?? "[UNKNOWN]";
};

export const getNetworkIpv4Address = () => {
  const interfaces = Object.values(networkInterfaces()).flat();
  const networkIpv4Interface = interfaces.find(({ family, internal }) => {
    return family === "IPv4" && !internal;
  });
  return networkIpv4Interface?.address ?? "[UNKNOWN]";
};
