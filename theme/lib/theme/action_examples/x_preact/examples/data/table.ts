import { VNode } from "preact"
import { html } from "htm/preact"

import {
    TableDataColumnRow,
    TableDataHeaderRow,
    TableStructure,
} from "../../../../../z_vendor/getto-table/preact/core"
import { TableDataSticky } from "../../../../../z_vendor/getto-table/preact/style"
import { tableStructure } from "../../../../../z_vendor/getto-table/preact/cell/structure"
import { tableCell } from "../../../../../z_vendor/getto-table/preact/cell/simple"
import { tableAlign, tableClassName } from "../../../../../z_vendor/getto-table/preact/decorator"

import {
    SortLink,
    table,
    tableColumn,
    tableHeader,
    tbody,
    thead,
} from "../../../../../z_vendor/getto-css/preact/design/data"
import {
    fieldSection,
    fieldSection_error,
} from "../../../../../z_vendor/getto-css/preact/design/form"
import {
    label_gray,
    label_warning,
    linky,
} from "../../../../../z_vendor/getto-css/preact/design/highlight"
import { small } from "../../../../../z_vendor/getto-css/preact/design/alignment"

import { Model, Row } from "./data"
import { icon } from "../../../../../x_preact/common/design/icon"

type Props = Readonly<{
    content: Readonly<{
        sticky: TableDataSticky
        header: TableDataHeaderRow
    }>
    rows: Row[]
    column: { (row: Row): TableDataColumnRow }
}>
export function DataTableComponent({ content, column, rows }: Props): VNode {
    return table(content.sticky, [
        thead(tableHeader(content)),
        tbody(rows.flatMap((row) => tableColumn({ ...content, column: column(row) }))),
    ])
}

export const buildDataStructure = (sort: SortLink) => (): TableStructure<Model, Row> =>
    tableStructure({
        key: (row: Row) => row.id,
        cells: [
            tableCell("id", (key) => {
                return {
                    label: () => "ID",
                    header: sort(key),
                    column: (row: Row) => row.id,
                }
            }).border(["rightDouble"]),

            tableCell("name", (key) => {
                return {
                    label: () => "名前",
                    header: sort(key),
                    column: (_row: Row) =>
                        fieldSection_error({
                            body: html`<input type="text" value="" />`,
                            help: ["識別のための作業名"],
                            notice: ["作業名は必須です"],
                        }),
                }
            }),

            tableCell("state", (key) => {
                return {
                    label: () => "状態",
                    header: sort(key),
                    column: (row: Row) => stateLabel(row.state),
                }
            }).decorateColumn(tableAlign(["center"])),

            tableCell("email", (key) => {
                return {
                    label: () => "メールアドレス",
                    header: sort(key),
                    column: (_row: Row) =>
                        fieldSection({
                            body: html`<input type="email" value="" />`,
                            help: ["連絡先メールアドレス"],
                        }),
                }
            }),

            tableCell("price", (key) => {
                return {
                    label: () => "価格",
                    header: sort(key),
                    column: (row: Row) => formatPrice(row.price),
                }
            }).decorateColumn(tableAlign(["numeric"])),

            tableCell("updatedAt", (key) => {
                return {
                    label: () => "更新日時",
                    header: sort(key),
                    column: (row: Row) => small(row.updatedAt),
                }
            }),

            tableCell("memo", (_key) => {
                return {
                    label: () => "メモ",
                    header: linky,
                    column: (row: Row) => row.memo,
                }
            }),

            tableCell("formalName", (_key) => {
                return {
                    label: () => "正式名称",
                    header: linky,
                    column: (_row: Row) => "名称",
                }
            }),

            tableCell("tel", (_key) => {
                return {
                    label: () => "問い合わせ電話番号",
                    header: linky,
                    column: (_row: Row) => "tel",
                }
            }),

            tableCell("edit", (_key) => {
                return {
                    label: () => "",
                    header: linky,
                    column: (_row: Row) => html`<a href="#">${icon("pencil")} 編集</a>`,
                }
            })
                .alwaysVisible()
                .border(["left"]),
        ],
    })
        .decorateRow(tableClassName(["row_hover"]))
        .stickyCross(1)
        .freeze()

function stateLabel(state: string) {
    switch (state) {
        case "仮":
            return label_gray(state)

        default:
            return label_warning(state)
    }
}

function formatPrice(price: number) {
    return Intl.NumberFormat("ja-JP").format(price)
}