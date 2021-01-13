import { h, VNode } from "preact"
import { useState } from "preact/hooks"
import { html } from "htm/preact"

import { container } from "../../../common/layout"

import { SearchForm } from "./SearchForm"
import { Pager } from "./Pager"
import { SearchColumn } from "./SearchColumn"
import { Table } from "./Table"

type ContainerProps = {
    // no props
}
export function Container(_: ContainerProps): VNode {
    return html`
        ${h(SearchForm, useSearchProps())} ${container([h(Pager, NO_PROPS), h(SearchColumn, NO_PROPS)])}
        ${h(Table, NO_PROPS)}
    `

    function useSearchProps(): SearchProps {
        const [state, setState] = useState<SearchState>(initialSearch)
        const component: SearchComponent = {
            search: () => {
                setState({ type: "try-to-search" })

                setTimeout(() => {
                    setState(initialSearch)
                }, 3000)
            },
            inputValidValue: () => {
                setState({
                    type: "search",
                    state: {
                        modified: true,
                        invalid: false,
                    },
                })
            },
            inputInvalidValue: () => {
                setState({
                    type: "search",
                    state: {
                        modified: true,
                        invalid: true,
                    },
                })
            },
        }
        return { state, component }
    }
}

export type SearchProps = Readonly<{
    state: SearchState
    component: SearchComponent
}>
export interface SearchComponent {
    search: Post<null>
    inputValidValue: Post<null>
    inputInvalidValue: Post<null>
}
export type SearchState =
    | Readonly<{ type: "search"; state: EditState }>
    | Readonly<{ type: "try-to-search" }>

export type EditState = Readonly<{
    modified: boolean
    invalid: boolean
}>

const initialEditState: EditState = {
    modified: false,
    invalid: false,
}
const initialSearch: SearchState = {
    type: "search",
    state: initialEditState,
}

interface Post<T> {
    (event: T): void
}

const NO_PROPS = {}
