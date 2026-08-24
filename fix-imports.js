import fs from "node:fs";
import path from "node:path";

const base = "src/shared/core/adapters/calculations";

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith(".ts")) {
            let content = fs.readFileSync(fullPath, "utf8");
            let updated = false;

            // Simple regex to find relative imports and replace them with absolute ones
            const regex = /from\s+["'](\.\.?\/[^"']+)["']/g;
            const newContent = content.replace(regex, (match, relPath) => {
                updated = true;
                const fileDir = path.dirname(fullPath);
                const absPath = path.resolve(fileDir, relPath);
                let newRel = path.relative(path.resolve("."), absPath);
                newRel = newRel.replace(/\\/g, "/");
                return `from "${newRel}"`;
            });

            if (updated) {
                fs.writeFileSync(fullPath, newContent, "utf8");
            }
        }
    }
}

walk(base);
