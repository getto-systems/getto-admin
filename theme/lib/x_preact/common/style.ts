import { VNode } from "preact"
import { html } from "htm/preact"

import { iconClass, lnir } from "../../z_external/icon"

import { siteInfo } from "./site"

export type VNodeContent = VNodeEntry | VNodeEntry[]
type VNodeEntry = string | VNode

export type LoginBoxContent = Readonly<{
    title: VNodeContent
    content: VNodeContent
    footer: VNodeContent
}>

export function loginBox({ title, content, footer }: LoginBoxContent): VNode {
    return html`<aside class="layout__login">
        <section class="loginBox">
            ${loginBoxHeader()}
            <article class="loginBox__main">
                <header class="loginBox__main__header">
                    <h1 class="loginBox__main__title">${title}</h1>
                </header>
                <main class="loginBox__main__body">${content}</main>
                <footer class="loginBox__main__footer">${footer}</footer>
            </article>
        </section>
    </aside>`
}

export function loginBoxHeader(): VNode {
    const { brand, title, subTitle } = siteInfo()
    return html`
        <header class="loginBox__header">
            <cite class="loginBox__header__brand">${brand}</cite>
            <strong class="loginBox__header__title">${title}</strong>
            <cite class="loginBox__header__subTitle">${subTitle}</cite>
        </header>
    `
}

export type MainLayoutContent = Readonly<{
    header: VNodeContent
    body: VNodeContent
}>

export function appLayout({ main, menu }: { main: VNodeContent; menu: VNodeContent }): VNode {
    return html`<main class="layout__app">${appContainer([main])} ${menu}</main>`
}

export function appLayout_sidebar({
    main,
    sidebar,
    menu,
}: {
    main: VNodeContent
    sidebar: VNodeContent
    menu: VNodeContent
}): VNode {
    return html`<main class="layout__app layout__app__sidebar_single">
        ${appContainer([main, sidebar])} ${menu}
    </main>`
}

export function appLayout_sidebar_double({
    main,
    sidebar,
    menu,
}: {
    main: VNodeContent
    sidebar: VNodeContent
    menu: VNodeContent
}): VNode {
    return html`<main class="layout__app layout__app__sidebar_double">
        ${appContainer([main, sidebar])} ${menu}
    </main>`
}

function appContainer(content: VNodeContent[]): VNode {
    return html`<section class="layout__app__container">${content}</section>`
}

export function appMain({ header, body }: MainLayoutContent): VNode {
    return html`<article class="layout__app__main">${header} ${body} ${mainFooter()}</article>`
}
export function appSidebar({ header, body }: MainLayoutContent): VNode {
    return html`<aside class="layout__app__sidebar">
        <section class="sidebar">${header} ${body} ${mainFooter()}</section>
    </aside>`
}
export function appMenu(content: VNodeContent): VNode {
    return html`<aside class="layout__app__menu">
        <section class="menu">${content}</section>
    </aside>`
}

export function mainHeader(content: VNodeContent): VNode {
    return html`<header class="main__header">${content}</header>`
}

export function mainTitle(content: VNodeContent): VNode {
    return html`<h1 class="main__title">${content}</h1>`
}

export function mainBody(content: VNodeContent): VNode {
    return html`<section class="main__body">${content}</section>`
}

export function sidebarBody(content: VNodeContent): VNode {
    return html`<section class="sidebar__body">${content}</section>`
}
export function sidebarBody_grow(content: VNodeContent): VNode {
    return html`<section class="sidebar__body sidebar__body_grow">${content}</section>`
}

export function mainFooter(): VNode {
    return html`<footer class="main__footer">
        <p class="main__footer__message">GETTO.systems</p>
    </footer>`
}

export function menuHeader(): VNode {
    const { brand, title, subTitle } = siteInfo()
    return html`<header class="menu__header">
        <cite class="menu__brand">${brand}</cite>
        <strong class="menu__title">${title}</strong>
        <cite class="menu__subTitle">${subTitle}</cite>
    </header>`
}

export function menuBox(content: VNodeContent): VNode {
    return html`<section class="menu__box">${content}</section>`
}

export function menuFooter(): VNode {
    return html`<footer class="menu__footer">
        <p class="menu__footer__message">
            powered by : LineIcons <span class="noWrap">/ みんなの文字</span>
        </p>
    </footer>`
}

export type BoxContent =
    | Readonly<{ type: "simple"; body: VNodeContent }>
    | Readonly<{ type: "title"; title: VNodeContent; body: VNodeContent }>
    | Readonly<{ type: "footer"; body: VNodeContent; footer: VNodeContent }>
    | Readonly<{ type: "full"; title: VNodeContent; body: VNodeContent; footer: VNodeContent }>

type BoxClass = "single" | "double" | "grow" | "fill"
function mapBoxClass(boxClass: BoxClass): string {
    switch (boxClass) {
        case "single":
            return ""

        default:
            return `box_${boxClass}`
    }
}

export function box(content: BoxContent): VNode {
    return boxContent("single", content)
}
export function box_double(content: BoxContent): VNode {
    return boxContent("double", content)
}
export function box_grow(content: BoxContent): VNode {
    return boxContent("grow", content)
}
export function box_fill(content: BoxContent): VNode {
    return boxContent("fill", content)
}

function boxContent(boxClass: BoxClass, content: BoxContent): VNode {
    return html`<article class="box ${mapBoxClass(boxClass)}">
        <main>${header()} ${boxBody(content)}</main>
        ${footer()}
    </article>`

    function header(): VNodeContent {
        switch (content.type) {
            case "simple":
            case "footer":
                return ""

            case "title":
            case "full":
                return boxHeader(content)
        }
    }
    function footer() {
        switch (content.type) {
            case "simple":
            case "title":
                return ""

            case "footer":
            case "full":
                return boxFooter(content)
        }
    }
}

function boxHeader({ title }: { title: VNodeContent }) {
    return html`<header class="box__header">
        <h2>${title}</h2>
    </header>`
}
function boxBody({ body }: { body: VNodeContent }) {
    return html`<section class="box__body">${body}</section>`
}
function boxFooter({ footer }: { footer: VNodeContent }) {
    return html`<footer class="box__footer">${footer}</footer>`
}

export type FormContent =
    | Readonly<{ type: NormalFormType; content: NormalFormContent }>
    | Readonly<{ type: NoticeFormType; content: NoticeFormContent }>

type NormalFormContent = Readonly<{
    title: VNodeContent
    body: VNodeContent
    help: VNodeContent[]
}>
type NoticeFormContent = Readonly<{
    title: VNodeContent
    body: VNodeContent
    help: VNodeContent[]
    notice: VNodeContent[]
}>

type FormType = NormalFormType | NoticeFormType
type NormalFormType = "normal" | "search" | "search_double"
type NoticeFormType = "error" | "warning"
function mapFormClass(formClass: FormType): string {
    switch (formClass) {
        case "normal":
            return ""

        case "search":
            return "search"

        case "search_double":
            return "search search_double"

        default:
            return `form_${formClass}`
    }
}

export function form(content: NormalFormContent): VNode {
    return formContent({ type: "normal", content })
}
export function form_error(content: NoticeFormContent): VNode {
    return formContent({ type: "error", content })
}
export function form_warning(content: NoticeFormContent): VNode {
    return formContent({ type: "warning", content })
}
export function search(content: NormalFormContent): VNode {
    return formContent({ type: "search", content })
}
export function search_double(content: NormalFormContent): VNode {
    return formContent({ type: "search_double", content })
}

function formContent(form: FormContent): VNode {
    return html`<dl class="form ${mapFormClass(form.type)}">
        <dt class="form__title">${form.content.title}</dt>
        <dd class="form__body">${form.content.body} ${help()}</dd>
    </dl>`

    function help() {
        switch (form.type) {
            case "error":
            case "warning":
                return formHelp([
                    ...form.content.help.map(toFormHelp),
                    ...form.content.notice.map(toFormNotice),
                ])

            default:
                return formHelp([...form.content.help.map(toFormHelp)])
        }
    }
}

function formHelp(content: VNodeContent) {
    return html`<aside class="form__help">${content}</aside>`
}
function toFormNotice(message: VNodeContent) {
    return html`<p class="form__notice">${message}</p>`
}
function toFormHelp(message: VNodeContent) {
    return html`<p>${message}</p>`
}

export type ModalContent = Readonly<{
    title: VNodeContent
    body: VNodeContent
    footer: VNodeContent
}>

export function modal({ title, body, footer }: ModalContent): VNode {
    return html`<section class="modal__box">
        ${modalHeader(title)} ${modalBody(body)} ${modalFooter(footer)}
    </section>`
}

function modalHeader(title: VNodeContent) {
    return html`<header class="modal__header">
        <h3 class="modal__title">${title}</h3>
    </header>`
}
function modalBody(content: VNodeContent) {
    return html`<section class="modal__body">${content}</section>`
}
function modalFooter(footer: VNodeContent) {
    return html`<footer class="modal__footer">${footer}</footer>`
}

export function container(content: VNodeContent): VNode {
    return html`<section class="container">${content}</section>`
}

export function small(content: VNodeContent): VNode {
    return html`<small>${content}</small>`
}
export function big(content: VNodeContent): VNode {
    return html`<big>${content}</big>`
}

export function icon(name: string): VNode {
    return html`<i class="${iconClass(lnir(name))}"></i>`
}

type Size = "small" | "medium" | "large"

export function v_small(): VNode {
    return vertical("small")
}
export function v_medium(): VNode {
    return vertical("medium")
}
export function v_large(): VNode {
    return vertical("large")
}
function vertical(size: Size): VNode {
    return html`<div class="vertical vertical_${size}"></div>`
}

type Color = "gray" | "alert" | "success" | "warning" | "pending" | "info"

export function notice_gray(content: VNodeContent): VNode {
    return notice("gray", content)
}
export function notice_alert(content: VNodeContent): VNode {
    return notice("alert", content)
}
export function notice_success(content: VNodeContent): VNode {
    return notice("success", content)
}
export function notice_warning(content: VNodeContent): VNode {
    return notice("warning", content)
}
export function notice_pending(content: VNodeContent): VNode {
    return notice("pending", content)
}
export function notice_info(content: VNodeContent): VNode {
    return notice("info", content)
}
function notice(color: Color, content: VNodeContent): VNode {
    return html`<p class="notice notice_${color}">${content}</p>`
}

export function label_gray(content: VNodeContent): VNode {
    return label("gray", content)
}
export function label_alert(content: VNodeContent): VNode {
    return label("alert", content)
}
export function label_success(content: VNodeContent): VNode {
    return label("success", content)
}
export function label_warning(content: VNodeContent): VNode {
    return label("warning", content)
}
export function label_pending(content: VNodeContent): VNode {
    return label("pending", content)
}
export function label_info(content: VNodeContent): VNode {
    return label("info", content)
}
function label(color: Color, content: VNodeContent): VNode {
    return html`<span class="label label_${color}">${content}</span>`
}

export function badge_gray(content: VNodeContent): VNode {
    return badge("gray", content)
}
export function badge_alert(content: VNodeContent): VNode {
    return badge("alert", content)
}
export function badge_success(content: VNodeContent): VNode {
    return badge("success", content)
}
export function badge_warning(content: VNodeContent): VNode {
    return badge("warning", content)
}
export function badge_pending(content: VNodeContent): VNode {
    return badge("pending", content)
}
export function badge_info(content: VNodeContent): VNode {
    return badge("info", content)
}
function badge(color: Color, content: VNodeContent): VNode {
    return html`<span class="badge badge_${color}">${content}</span>`
}

export type ButtonsContent = Readonly<{
    left: VNodeContent
    right: VNodeContent
}>
export function buttons({ left, right }: ButtonsContent): VNode {
    return html`<aside class="button__container">
        <section class="button_left">${left}</section>
        <section class="button_right">${right}</section>
    </aside>`
}
