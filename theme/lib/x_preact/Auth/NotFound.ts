import { h, VNode } from "preact"
import { useEffect, useErrorBoundary } from "preact/hooks"
import { html } from "htm/preact"

import { loginBox } from "../../z_external/getto-css/preact/layout/login"
import { buttons } from "../../z_external/getto-css/preact/design/form"

import { useComponent, useTerminate } from "../common/hooks"
import { siteInfo } from "../common/site"
import { icon } from "../common/icon"

import { ApplicationError } from "../common/System/ApplicationError"

import { NotFoundEntryPoint } from "../../auth/NotFound/NotFound/view"
import {
    CurrentVersionComponent,
    initialCurrentVersionState,
} from "../../auth/NotFound/currentVersion/component"

type Props = Readonly<{
    notFound: NotFoundEntryPoint
}>
export function NotFound({ notFound: { resource, terminate } }: Props): VNode {
    const [err] = useErrorBoundary((err) => {
        // 認証していないのでエラーはどうしようもない
        console.log(err)
    })

    if (err) {
        return h(ApplicationError, { err: `${err}` })
    }

    useTerminate(terminate)

    useEffect(() => {
        document.title = `Not Found | ${document.title}`
    }, [])

    return h(Content, resource)
}

type ContentProps = Readonly<{
    currentVersion: CurrentVersionComponent
}>
function Content({ currentVersion }: ContentProps): VNode {
    const state = useComponent(currentVersion, initialCurrentVersionState)
    useEffect(() => {
        currentVersion.load()
    }, [])

    return loginBox(siteInfo(), {
        title: "リンクが切れていました",
        content: [
            html`<p>
                リンクされたページが見つかりませんでした<br />
                これはシステム側の不備です
            </p>`,
            html`<p>
                お手数ですが、管理者にクリックしたリンクをお伝えください<br />
                直前まで行っていた作業も教えていただけると助かります
            </p>`,
            html`<p>作業は左下のリンクからホームに戻って続けられます</p>`,
        ],
        footer: buttons({
            left: [html`<a href="${homeHref()}">${icon("home")} ホームへ</a>`],
        }),
    })

    function homeHref() {
        switch (state.type) {
            case "initial-current-version":
                return "#"

            case "succeed-to-find":
                return `/${state.currentVersion}/index.html`
        }
    }
}
