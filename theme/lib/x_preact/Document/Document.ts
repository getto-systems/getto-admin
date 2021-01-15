import { h, VNode } from "preact"
import { useErrorBoundary } from "preact/hooks"
import { html } from "htm/preact"

import { useTerminate } from "../common/hooks"
import { footer, menuHeader, menuFooter } from "../layout"

import { ApplicationError } from "../common/System/ApplicationError"
import { MenuList } from "../Outline/MenuList"
import { Content } from "./Content"

import { DocumentEntryPoint } from "../../document/Document/Document/view"

type Props = {
    document: DocumentEntryPoint
}
export function Document({ document: { resource, terminate } }: Props): VNode {
    const [err] = useErrorBoundary((err) => {
        // 認証していないのでエラーはどうしようもない
        console.log(err)
    })

    if (err) {
        return h(ApplicationError, { err: `${err}` })
    }

    useTerminate(terminate)

    return html`
        <main class="layout">
            <article class="layout__main">${h(Content, resource)} ${footer()}</article>
            <aside class="layout__menu menu">
                ${menuHeader()} ${h(MenuList, resource)} ${menuFooter()}
            </aside>
        </main>
    `
}