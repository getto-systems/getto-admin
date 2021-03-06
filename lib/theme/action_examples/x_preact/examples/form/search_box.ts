import { h, VNode } from "preact"
import { html } from "htm/preact"

import { box_double } from "../../../../../z_vendor/getto-css/preact/design/box"
import {
    field,
    label_search,
    label_search_fill,
    label_search_large,
    label_search_small,
    label_search_xLarge,
} from "../../../../../z_vendor/getto-css/preact/design/form"

import { FormProps } from "./container"
import { FormFooterComponent } from "./form_footer"

type Props = FormProps
export function SearchBoxComponent(props: Props): VNode {
    const { action: component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return box_double({
        title: "search box",
        body: [
            field({
                title: "small",
                body: label_search_small(html`<input type="search" onInput=${onInput} />`),
                help: [],
            }),
            field({
                title: "default",
                body: label_search(html`<input type="search" onInput=${onInput} />`),
                help: [],
            }),
            field({
                title: "large",
                body: label_search_large(html`<input type="search" onInput=${onInput} />`),
                help: [],
            }),
            field({
                title: "extra large",
                body: label_search_xLarge(html`<input type="search" onInput=${onInput} />`),
                help: [],
            }),
            field({
                title: "fill",
                body: label_search_fill(html`<input type="search" onInput=${onInput} />`),
                help: [],
            }),
        ],
        footer: h(FormFooterComponent, props),
    })
}
