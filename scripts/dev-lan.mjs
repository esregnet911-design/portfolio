import { spawn } from "node:child_process";
import os from "node:os";
import path from "node:path";

const portArgIndex = process.argv.findIndex((arg) => arg === "--port" || arg === "-p");
const port = portArgIndex >= 0 ? process.argv[portArgIndex + 1] : process.env.PORT || "3000";

function getLanAddresses() {
  return Object.values(os.networkInterfaces())
    .flat()
    .filter(Boolean)
    .filter((item) => item.family === "IPv4" && !item.internal)
    .map((item) => item.address)
    .filter((address) => {
      if (address.startsWith("192.168.")) return true;
      if (address.startsWith("10.")) return true;
      const match = address.match(/^172\.(\d+)\./);
      return match ? Number(match[1]) >= 16 && Number(match[1]) <= 31 : false;
    });
}

const addresses = getLanAddresses();

console.log("");
console.log("Portfolio dev server");
console.log(`Local:   http://127.0.0.1:${port}`);

if (addresses.length) {
  console.log("Network:");
  for (const address of addresses) {
    console.log(`  http://${address}:${port}`);
  }
} else {
  console.log("Network: no LAN IPv4 address detected yet");
}

console.log("");
console.log("Open the Network URL on your phone while it is on the same WiFi.");
console.log("");

const nextBin = path.join(process.cwd(), "node_modules", ".bin", "next");
const child = spawn(nextBin, ["dev", "--hostname", "0.0.0.0", "--port", port], {
  stdio: "inherit",
  env: process.env
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});
