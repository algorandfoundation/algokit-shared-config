const fs = require("fs");
const path = require("path");

const actionDir = __dirname;
const workspaceDir = process.cwd();

const configPath = path.join(actionDir, "typedoc.devportal.json");
const finalConfigPath = path.join(workspaceDir, "typedoc.devportal.json");

const pluginPath = path.join(actionDir, "frontmatter-plugin.mjs");
const finalPluginPath = path.join(workspaceDir, "frontmatter-plugin.mjs");

try {
  if (fs.existsSync(finalConfigPath)) {
    console.log("ℹ️  User provided config file found.");
    console.log("   Skipping dynamic generation to respect project settings.");
    process.exit(0);
  }
  if (!fs.existsSync(configPath)) {
    console.error(`Docs config not found at: ${configPath}`);
    process.exit(1);
  }

  const config = require(configPath);

  fs.writeFileSync(finalConfigPath, JSON.stringify(config, null, 2));
  console.log(`✅ Generated config file at: ${finalConfigPath}`);

  // Copy the plugin file to the workspace root
  if (fs.existsSync(pluginPath)) {
    fs.copyFileSync(pluginPath, finalPluginPath);
    console.log(`✅ Copied plugin file to: ${finalPluginPath}`);
  } else {
    console.warn(`⚠️  Plugin file not found at: ${pluginPath}`);
  }
} catch (error) {
  console.error("❌ Error generating config:", error);
  process.exit(1);
}
