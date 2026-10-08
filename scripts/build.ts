import { cpSync, rmSync } from "node:fs";
import { join } from "node:path";
import * as esbuild from "esbuild";

const rootDir = join(import.meta.dirname, "..");
const outDir = join(rootDir, "dist");
const watch = process.argv.includes("--watch");

// manifest.json やアイコンなど public/ 以下のファイルは、そのまま dist/ にコピーする。
const copyPublic: esbuild.Plugin = {
  name: "copy-public",
  setup(build) {
    build.onEnd((result) => {
      if (result.errors.length === 0) {
        cpSync(join(rootDir, "public"), outDir, { recursive: true });
      }
    });
  },
};

const options: esbuild.BuildOptions = {
  entryPoints: [join(rootDir, "src", "content.ts"), join(rootDir, "src", "content.css")],
  outdir: outDir,
  bundle: true,
  format: "iife",
  target: "chrome120",
  sourcemap: watch ? "inline" : false,
  logLevel: "info",
  plugins: [copyPublic],
};

rmSync(outDir, { recursive: true, force: true });

if (watch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
} else {
  await esbuild.build(options);
}
