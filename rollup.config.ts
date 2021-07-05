import ts from "rollup-plugin-ts";
import { resolve } from "path";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import { dependencies, main, module } from "./package.json";

const baseDir = resolve(__dirname);
const inputFilePath = resolve(baseDir, "mod.ts");
const banner =
  "/*! Copyright (c) 2021-present the taskell authors. All rights reserved. MIT license. */";
const external = Object.keys(dependencies);

const replaceOption = {
  ".ts": "",
  // Dependency rename for node
  preventAssignment: true,
};
const config = [
  {
    input: inputFilePath,
    plugins: [
      replace(replaceOption),
      ts({
        transpiler: "babel",
        tsconfig: (resolvedConfig) => ({
          ...resolvedConfig,
          declaration: false,
        }),
      }),
      terser(),
    ],

    external,

    output: {
      file: main,
      format: "cjs",
      sourcemap: true,
      banner,
    },
  },
  {
    input: inputFilePath,
    plugins: [
      replace(replaceOption),
      ts({
        transpiler: "babel",
      }),
      terser(),
    ],

    external,

    output: {
      file: module,
      format: "es",
      sourcemap: true,
      banner,
    },
  },
];

export default config;
