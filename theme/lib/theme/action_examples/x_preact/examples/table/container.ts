import { h, VNode } from "preact"
import { useMemo } from "preact/hooks"
import { html } from "htm/preact"

import { sortSign } from "../../../../../x_preact/common/design/table"

import { visibleAll } from "../../../../../z_vendor/getto-table/preact/core"

import { container } from "../../../../../z_vendor/getto-css/preact/design/box"
import { Sort, sortLink } from "../../../../../z_vendor/getto-css/preact/design/data"

import { TablePagerComponent } from "./pager"
import { TableViewColumnsComponent } from "./view_columns"
import { buildStructure, TableTableComponent } from "./table"

import { generateLogs, generateTableRows, Model, Row } from "./data"

type ContainerProps = {
    // no props
}
export function TableContainerComponent(_: ContainerProps): VNode {
    const sort: Sort = {
        key: "id",
        order: "normal",
        href: (query) => `?sort=${query.key}.${query.order}`,
        sign: sortSign,
    }
    const structure = useMemo(buildStructure(sortLink(sort)), [])

    const model: Model = {
        logs: generateLogs(),
        alarmMaxLength: 3,
        temperatureTypes: ["high", "low"],
        sumPrice: 8300,
    }

    const params = {
        visibleKeys: visibleAll,
        model,
    }

    const content = {
        sticky: structure.sticky(),
        view: structure.view(params),
        header: structure.header(params),
        summary: structure.summary(params),
        footer: structure.footer(params),
    }
    const tableProps = {
        content,
        rows: generateTableRows(),
        column: (row: Row) => structure.column(params, row),
    }

    return html`
        ${container([h(TablePagerComponent, NO_PROPS), h(TableViewColumnsComponent, content)])}
        ${h(TableTableComponent, tableProps)}
    `
}

const NO_PROPS = {}
