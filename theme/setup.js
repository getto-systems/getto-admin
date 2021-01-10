/* eslint-disable */
const fs = require("fs")
const path = require("path")

const entryPoint = require("./entryPoint")

function dumpEnv() {
    const isProduction = process.env.BUILD_ENV == "production"
    let version = (() => {
        if (isProduction) {
            return fs.readFileSync(path.join(__dirname, "../.release-version"), "utf8").trim()
        } else {
            return "dist"
        }
    })()

    const env = {
        isProduction,
        version,

        storageKey: {
            menuExpand: {
                main: process.env.STORAGE_KEY_MENU_EXPAND_MAIN,
                document: process.env.STORAGE_KEY_MENU_EXPAND_DOCUMENT,
            },
        },
    }

    dump(
        path.join(__dirname, "./lib/y_static/env.ts"),
        "export const env = " + JSON.stringify(env, null, "    ")
    )
}

function dumpEntryPoint() {
    const files = entryPoint.findHtmlEntries()
    const docs = files.filter(isDocs)
    dump(
        path.join(__dirname, "./lib/y_static/path.ts"),
        [
            "export type StaticMenuPath =" + toTypeVariant(files),
            "export type StaticContentPath =" + toTypeVariant(docs),
            "export const staticContentPaths: StaticContentPath[] = " + toConstValue(docs),
        ].join("\n")
    )

    function isDocs(file) {
        return file.startsWith("/docs/")
    }

    function toTypeVariant(files) {
        if (files.length === 0) {
            return ' ""'
        }
        const padding = "\n    | "
        return padding + files.map(toStringLiteral).join(padding)
    }
    function toConstValue(files) {
        return JSON.stringify(files, null, "    ")
    }

    function toStringLiteral(file) {
        return `"${file}"`
    }
}

function dump(file, content) {
    console.log(file)
    console.log(content)
    fs.writeFileSync(file, content + "\n")
}

dumpEnv()
dumpEntryPoint()
