import { VNode } from "preact"
import { html } from "htm/preact"

import { buttons, loginBox } from "../layout"

type Props = Readonly<{
    err: string
}>

export function ApplicationError({ err }: Props): VNode {
    return loginBox({
        title: html`システムエラーが発生しました`,
        content: [
            html`<p>
                エラーが発生したため、処理を中断しました<br />
                これはシステム側の不備です
            </p>`,
            html`<p>詳細: ${err}</p>`,
            html`<p>
                お手数ですが、管理者に詳細をお伝えください<br />
                直前まで行っていた作業も教えていただけると助かります
            </p>`,
            html`<p>
                左下のリンクで再読み込みすることで解消するかもしれません<br />
                繰り返しエラーになる場合は右下のホームから戻ってください
            </p>`,
        ],
        footer: buttons({ left: [reloadLink()], right: [topLink()] }),
    })

    function topLink() {
        return html`<a href="/"><i class="lnir lnir-home"></i> ホーム</a>`
    }
    function reloadLink() {
        // search param をリセットしてやり直してみる
        return html`<a href="?"><i class="lnir lnir-reload"></i> 再読み込み</a>`
    }
}
