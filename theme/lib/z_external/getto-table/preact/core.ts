import { VNodeContent, VNodeKey } from "../../preact/common"

import { TableDataClassName, TableDataFullStyle, TableDataSticky } from "./style"

export interface TableStructure<M, R> {
    view(params: TableDataParams<M>): TableDataView[]
    header(params: TableDataParams<M>): TableDataHeaderRow
    summary(params: TableDataParams<M>): TableDataSummaryRow
    column(params: TableDataParams<M>, row: R): TableDataColumnRow
    footer(params: TableDataParams<M>): TableDataFooterRow

    sticky(): TableDataSticky
}

export type TableDataParams<M> = Readonly<{ model: M; visibleKeys: TableDataVisibleKeys }>
export type TableDataCellKey = VNodeKey
export type TableDataVisibleKeys =
    | Readonly<{ type: "all" }>
    | Readonly<{ type: "keys"; keys: TableDataCellKey[] }>

export const visibleAll: TableDataVisibleKeys = { type: "all" }
export function visibleKeys(keys: TableDataCellKey[]): TableDataVisibleKeys {
    return { type: "keys", keys }
}

export type TableDataView = Readonly<{
    type: "view"
    key: VNodeKey
    content: VNodeContent
    isVisible: boolean
}>

export type TableDataHeader = TableDataHeaderSingle | TableDataHeaderExpansion | TableDataHeaderGroup

export type TableDataHeaderSingle = Readonly<{
    type: "single"
    key: VNodeKey
    style: TableDataFullStyle
    content: VNodeContent
    height: 1
    length: 1
}>
export type TableDataHeaderExpansion = Readonly<{
    type: "expansion"
    key: VNodeKey
    style: TableDataFullStyle
    content: VNodeContent
    height: 1
    length: number
}>
export type TableDataHeaderGroup = Readonly<{
    type: "group"
    key: VNodeKey
    style: TableDataFullStyle
    content: VNodeContent
    children: TableDataHeader[]
    height: number
    length: number
}>

export type TableDataSummary = TableDataSummarySingle | TableDataSummaryExpansion

export type TableDataSummarySingle =
    | (TableDataSummarySingle_base & Readonly<{ type: "empty" }>)
    | (TableDataSummarySingle_base & Readonly<{ type: "single"; content: VNodeContent }>)
type TableDataSummarySingle_base = Readonly<{
    key: VNodeKey
    style: TableDataFullStyle
    length: 1
}>

export type TableDataSummaryExpansion =
    | (TableDataSummaryExpansion_base & Readonly<{ type: "empty-expansion" }>)
    | (TableDataSummaryExpansion_base & Readonly<{ type: "expansion"; content: VNodeContent }>)
type TableDataSummaryExpansion_base = Readonly<{
    key: VNodeKey
    style: TableDataFullStyle
    length: number
}>

export type TableDataColumn = TableDataColumnSingle | TableDataColumnExpansion | TableDataColumnTree

export type TableDataColumnSingle = Readonly<{
    type: "single"
    key: VNodeKey
    style: TableDataFullStyle
    content: VNodeContent
    length: 1
    height: 1
}>
export type TableDataColumnExpansion = Readonly<{
    type: "expansion"
    key: VNodeKey
    style: TableDataFullStyle
    length: number
    height: 1
    columns: TableDataColumnSingle[]
}>
export type TableDataColumnTree = Readonly<{
    type: "tree"
    children: TableDataColumnRow[]
    length: number
    height: number
    style: TableDataFullStyle
}>

export type TableCellTreePaddingContent = Readonly<{
    key: VNodeKey
    rowHeight: number
    column: TableDataColumnTree
}>

export type TableDataHeaderRow = Readonly<{
    key: TableDataHeaderKeyProvider
    className: TableDataClassName
    headers: TableDataHeader[]
}>
export type TableDataSummaryRow = Readonly<{
    key: VNodeKey
    className: TableDataClassName
    summaries: TableDataSummary[]
}>
export type TableDataColumnRow = Readonly<{
    key: VNodeKey
    className: TableDataClassName
    columns: TableDataColumn[]
}>
export type TableDataFooterRow = Readonly<{
    key: VNodeKey
    className: TableDataClassName
    footers: TableDataSummary[]
}>

export interface TableDataHeaderKeyProvider {
    (index: number): VNodeKey
}
export interface TableDataKeyProvider {
    (): VNodeKey
}
