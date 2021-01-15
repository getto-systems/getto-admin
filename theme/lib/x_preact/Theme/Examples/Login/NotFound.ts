import { h, VNode } from "preact"
import { useEffect, useErrorBoundary } from "preact/hooks"
import { html } from "htm/preact"

import { ApplicationError } from "../../../common/System/ApplicationError"

import { fullScreenError } from "../../../common/layout"

type Props = Readonly<{
    // no props
}>
export function NotFound(_: Props): VNode {
    const [err] = useErrorBoundary((err) => {
        // 認証していないのでエラーはどうしようもない
        console.log(err)
    })

    if (err) {
        return h(ApplicationError, { err: `${err}` })
    }

    useEffect(() => {
        document.title = `Not Found | ${document.title}`
    }, [])

    return fullScreenError(
        "見つかりませんでした",
        [
            html`<p>リンクされたページは存在しません</p>`,
            html`<p>お手数ですが、管理者にクリックしたリンクをお伝えください</p>`,
        ],
        html`<section class="button__container">
            <div></div>
            <div class="login__link">
                <a href="#"><i class="lnir lnir-home"></i> ホームへ</a>
            </div>
        </section>`
    )
}