import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "com.zerostack.pocketcap",
    appName: "PocketCap",
    webDir: "dist",
    server: {
        androidScheme: "https",
        cleartext: true,
    },
};

export default config;
