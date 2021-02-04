import { DocumentResource } from "../entryPoint"

import { MenuListComponentFactory } from "../../../../auth/Outline/menuList/component"
import { BreadcrumbListComponentFactory } from "../../../../auth/Outline/breadcrumbList/component"

import { ContentComponentFactory } from "../../content/component"

import { MenuAction, MenuTargetCollector } from "../../../../auth/permission/menu/action"

import { ContentAction, LoadContentCollector } from "../../../content/action"

export type DocumentFactory = Readonly<{
    actions: Readonly<{
        menu: MenuAction
        content: ContentAction
    }>
    components: Readonly<{
        menuList: MenuListComponentFactory
        breadcrumbList: BreadcrumbListComponentFactory

        content: ContentComponentFactory
    }>
}>
export type DocumentCollector = Readonly<{
    menu: MenuTargetCollector
    content: LoadContentCollector
}>
export function initDocumentResource(
    factory: DocumentFactory,
    collector: DocumentCollector
): DocumentResource {
    const actions = {
        loadBreadcrumb: factory.actions.menu.loadBreadcrumb(collector.menu),
        loadMenu: factory.actions.menu.loadMenu(collector.menu),
        toggleMenuExpand: factory.actions.menu.toggleMenuExpand(),

        loadDocument: factory.actions.content.loadContent(collector.content),
    }
    return {
        menuList: factory.components.menuList(actions),
        breadcrumbList: factory.components.breadcrumbList(actions),

        content: factory.components.content(actions),
    }
}
