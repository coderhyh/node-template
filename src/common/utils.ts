import os from "os";

import crypto from "crypto";

export const password2md5 = (password: string) => {
  const md5 = crypto.createHash("md5");
  const result = md5.update(password).digest("hex");
  return result;
};

export function getIpAddress() {
  let ifaces = os.networkInterfaces();
  for (let dev in ifaces) {
    let iface = ifaces[dev];
    if (iface) {
      for (let i = 0; i < iface.length; i++) {
        let { family, address, internal } = iface[i];
        if (family === "IPv4" && address !== "127.0.0.1" && !internal) {
          return address;
        }
      }
    }
  }
}
