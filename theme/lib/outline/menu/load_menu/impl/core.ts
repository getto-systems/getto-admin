import { menuExpandRepositoryConverter } from "../../kernel/impl/convert"

import { buildMenu } from "../../kernel/impl/menu"

import { LoadMenuInfra, LoadMenuStore } from "../infra"
import { initMenuExpand, MenuBadge } from "../../kernel/infra"

import { LoadMenuPod } from "../method"

import { LoadMenuEvent } from "../event"

interface Load {
    (infra: LoadMenuInfra, store: LoadMenuStore): LoadMenuPod
}
export const loadMenu: Load = (infra, store) => (detecter) => async (post) => {
    const menuExpand = infra.menuExpand(menuExpandRepositoryConverter)

    const menuExpandResult = menuExpand.get()
    if (!menuExpandResult.success) {
        post({ type: "repository-error", err: menuExpandResult.err })
        return
    }

    const expand = menuExpandResult.found ? menuExpandResult.value : initMenuExpand()

    // update badge と toggle のため、現在の expand を保存しておく必要がある
    store.menuExpand.set(expand)

    post({
        type: "succeed-to-load",
        menu: buildMenu({
            version: infra.version,
            menuTree: infra.menuTree,
            menuTargetPath: detecter(),
            menuExpand: expand,
            menuBadge: EMPTY_BADGE, // ロードに時間がかかる可能性があるのであとでロードする
        }),
    })
}

export function loadMenuEventHasDone(_event: LoadMenuEvent): boolean {
    return true
}

const EMPTY_BADGE: MenuBadge = {}