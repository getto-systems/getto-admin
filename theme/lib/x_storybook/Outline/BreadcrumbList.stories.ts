import { h, VNode } from "preact"
import { html } from "htm/preact"

import { BreadcrumbList } from "../../x_preact/Outline/BreadcrumbList"

import {
    mapBreadcrumbMockProps,
    BreadcrumbMockProps,
    initBreadcrumbListComponent,
} from "../../auth/Outline/breadcrumbList/mock"

import { initialBreadcrumbListState } from "../../auth/Outline/breadcrumbList/component"

import "../../../css/getto.css"

export default {
    title: "Outline/BreadcrumbList",
    argTypes: {
        type: {
            table: { disable: true },
        },
    },
}

type MockProps = BreadcrumbMockProps
const Template: Story<MockProps> = (args) => {
    const breadcrumbList = initBreadcrumbListComponent(initialBreadcrumbListState)
    return h(Preview, { args })

    function Preview(props: { args: MockProps }) {
        breadcrumbList.update(mapBreadcrumbMockProps(props.args))
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
