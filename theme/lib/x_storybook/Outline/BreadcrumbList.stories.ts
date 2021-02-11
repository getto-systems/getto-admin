import { h, VNode } from "preact"
import { useEffect } from "preact/hooks"
import { html } from "htm/preact"

import { BreadcrumbList } from "../../x_preact/Outline/BreadcrumbList"

import { initMockPropsPasser } from "../../sub/getto-example/application/mock"
import {
    BreadcrumbListMockProps,
    initMockBreadcrumbListComponent,
} from "../../auth/Outline/breadcrumbList/mock"

import "../../../css/getto.css"

export default {
    title: "Outline/BreadcrumbList",
    argTypes: {
        type: {
            table: { disable: true },
        },
    },
}

type MockProps = BreadcrumbListMockProps
const Template: Story<MockProps> = (args) => {
    const passer = initMockPropsPasser<BreadcrumbListMockProps>()
    const breadcrumbList = initMockBreadcrumbListComponent(passer)
    return h(Preview, { args })

    function Preview(props: { args: MockProps }) {
        useEffect(() => {
            passer.update(props.args)
        })
        return html` <header class="main__header">
            <h1 class="main__title">タイトル</h1>
            ${h(BreadcrumbList, { breadcrumbList })}
        </header>`
    }
}

interface Story<T> {
    args?: T
    (args: T): VNode
}

export const Success = Template.bind({})
Success.args = {
    type: "success",
    label: "ホーム",
    icon: "home",
}
