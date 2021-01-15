import { VNode } from "preact"
import { html } from "htm/preact"

import { VNodeContent } from "../../common/layout"

export function simpleBox(content: VNodeContent): VNode {
    return simpleBoxContent("", content)
}
export function simpleBox_grow(content: VNodeContent): VNode {
    return simpleBoxContent("box_grow", content)
}
export function simpleBox_fill(content: VNodeContent): VNode {
    return simpleBoxContent("box_fill", content)
}
function simpleBoxContent(boxClass: string, content: VNodeContent): VNode {
    return html`<section class="box ${boxClass}">${boxBody(content)}</section>`
}

export function box(title: VNodeContent, content: VNodeContent): VNode {
    return boxContent("", title, content)
}
export function box_double(title: VNodeContent, content: VNodeContent): VNode {
    return boxContent("", title, content)
}
function boxContent(boxClass: string, title: VNodeContent, content: VNodeContent): VNode {
    return html`<section class="box ${boxClass}">
        <div>${boxHeader(title)} ${boxBody(content)}</div>
    </section>`
}

export function fullBox(title: VNodeContent, content: VNodeContent, footer: VNodeContent): VNode {
    return fullBoxContent("", title, content, footer)
}
export function fullBox_double(title: VNodeContent, content: VNodeContent, footer: VNodeContent): VNode {
    return fullBoxContent("box_double", title, content, footer)
}
export function fullBox_editing(
    title: VNodeContent,
    content: VNodeContent,
    footer: VNodeContent
): VNode {
    return fullBoxContent("box_editing", title, content, footer)
}
export function fullBox_double_editing(
    title: VNodeContent,
    content: VNodeContent,
    footer: VNodeContent
): VNode {
    return fullBoxContent("box_double box_editing", title, content, footer)
}
function fullBoxContent(
    boxClass: string,
    title: VNodeContent,
    content: VNodeContent,
    footer: VNodeContent
): VNode {
    return html`<section class="box ${boxClass}">
        <div>${boxHeader(title)} ${boxBody(content)}</div>
        ${boxFooter(footer)}
    </section>`
}

export function noTitleBox(content: VNodeContent, footer: VNodeContent): VNode {
    return noTitleBoxContent("", content, footer)
}
export function searchBox_fill(content: VNodeContent, footer: VNodeContent): VNode {
    return noTitleBoxContent("box_fill box_search", content, footer)
}
export function noTitleBoxContent(boxClass: string, content: VNodeContent, footer: VNodeContent): VNode {
    return html`<section class="box ${boxClass}">
        <section class="box__body container">${content}</section>
        ${footer}
    </section>`
}

function boxHeader(title: VNodeContent) {
    return html`<header class="box__header">
        <h2 class="box__title">${title}</h2>
    </header>`
}
function boxBody(content: VNodeContent) {
    return html`<section class="box__body">${content}</section>`
}
function boxFooter(footer: VNodeContent) {
    return html`<footer class="box__footer">${footer}</footer>`
}

export function form(title: VNodeContent, content: VNodeContent): VNode {
    return formContent("", title, content)
}
export function form_error(title: VNodeContent, content: VNodeContent): VNode {
    return formContent("form_error", title, content)
}
export function form_warning(title: VNodeContent, content: VNodeContent): VNode {
    return formContent("form_warning", title, content)
}
export function formContent(formClass: string, title: VNodeContent, content: VNodeContent): VNode {
    return html`<dl class="form ${formClass}">
        <dt class="form__header">${title}</dt>
        <dd class="form__field">${content}</dd>
    </dl>`
}

export function formWithHelp(title: VNodeContent, content: VNodeContent, help: VNodeContent[]): VNode {
    return form(title, html`${content} ${help.map(toFormHelp)}`)
}
export function formWithHelp_error(
    title: VNodeContent,
    content: VNodeContent,
    messages: VNodeContent[],
    help: VNodeContent[]
): VNode {
    return form_error(title, html`${content} ${messages.map(toFormMessage)} ${help.map(toFormHelp)}`)
}
export function formWithHelp_warning(
    title: VNodeContent,
    content: VNodeContent,
    messages: VNodeContent[],
    help: VNodeContent[]
): VNode {
    return form_warning(title, html`${content} ${messages.map(toFormMessage)} ${help.map(toFormHelp)}`)
}

function toFormMessage(message: VNodeContent) {
    return html`<p class="form__message">${message}</p>`
}
function toFormHelp(message: VNodeContent) {
    return html`<p class="form__help">${message}</p>`
}

export function search(title: VNodeContent, content: VNodeContent): VNode {
    return searchContent("", title, content)
}
export function searchContent(searchClass: string, title: VNodeContent, content: VNodeContent): VNode {
    return html`<dl class="search ${searchClass}">
        <dt class="search__header">${title}</dt>
        <dd class="search__field">${content}</dd>
    </dl>`
}

export function searchWithHelp(title: VNodeContent, content: VNodeContent, help: VNodeContent[]): VNode {
    return search(title, html`${content} ${help.map(toSearchHelp)}`)
}

function toSearchHelp(message: VNodeContent) {
    return html`<p class="search__help">${message}</p>`
}

export function modal(title: VNodeContent, content: VNodeContent): VNode {
    return html`<section class="modal__box">${modalHeader(title)} ${modalBody(content)}</section>`
}
export function fullModal(title: VNodeContent, content: VNodeContent, footer: VNodeContent): VNode {
    return html`<section class="modal__box">
        ${modalHeader(title)} ${modalBody(content)} ${modalFooter(footer)}
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
    return html`<big>
        <footer class="modal__footer">${footer}</footer>
    </big>`
}