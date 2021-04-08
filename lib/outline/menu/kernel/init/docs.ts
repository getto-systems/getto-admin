import { env } from "../../../../y_environment/env"

import { lnir } from "../../../../z_details/icon/line_icon"

import { category, item } from "./common"

import { MenuContent, MenuPermission } from "../infra"

export function docsMenuContent(): MenuContent {
    return {
        database: env.database.menuExpand,
        key: "docs",
        loadMenuBadge: false,
        menuTree: [
            category("MAIN", allow, [
                item("ホーム", lnir("home"), "/index.html"),
                item("ドキュメント", lnir("files-alt"), "/docs/index.html"),
                item("プライバシーポリシー", lnir("files-alt"), "/docs/privacy-policy.html"),
            ]),
            ...(env.isProduction
                ? []
                : [
                      category("開発用", dev, [
                          item("coverage", lnir("files-alt"), "/coverage/lcov-report/index.html"),
                      ]),
                  ]),
        ],
    }
}

const allow: MenuPermission = { type: "allow" }
const dev: MenuPermission = { type: "role", role: "dev-docs" }
