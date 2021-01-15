import { h, VNode } from "preact"
import { html } from "htm/preact"

import { MenuList } from "../../x_preact/Outline/MenuList"
import { menuHeader } from "../../x_preact/layout"

import {
    mapMenuMockProps,
    MenuMockProps,
    initMenuListComponent,
} from "../../auth/Outline/menuList/mock"

import { initialMenuListState } from "../../auth/Outline/menuList/component"

import "../../../css/getto.css"

export default {
    title: "Outline/MenuList",
    argTypes: {
        type: {
            table: { disable: true },
        },
    },
}

type MockProps = MenuMockProps
const Template: Story<MockProps> = (args) => {
    const menuList = initMenuListComponent(initialMenuListState)
    return h(Preview, { args })

    function Preview(props: { args: MockProps }) {
        menuList.update(mapMenuMockProps(props.args))
        return html`<main class="layout">
            <aside class="layout__menu menu">
                ${menuHeader()} ${h(MenuList, { menuList })}
            </aside>
        </main>`
    }
}

interface Story<T> {
    args?: T
    (args: T): VNode
}

export const Success = Template.bind({})
Success.args = {
    type: "success",
    badgeCount: 99,
}

export const EmptyNonce = Template.bind({})
EmptyNonce.args = {
    type: "empty-nonce",
}

export const BadRequest = Template.bind({})
BadRequest.args = {
    type: "bad-request",
}

export const ServerError = Template.bind({})
ServerError.args = {
    type: "server-error",
}

export const BadResponse = Template.bind({})
BadResponse.args = {
    type: "bad-response",
    err: "response error",
}

export const InfraError = Template.bind({})
InfraError.args = {
    type: "infra-error",
    err: "infra error",
}
