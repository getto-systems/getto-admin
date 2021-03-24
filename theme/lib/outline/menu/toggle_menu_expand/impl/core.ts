import { menuExpandRepositoryConverter } from "../../kernel/impl/convert"

import { buildMenu } from "../../kernel/impl/menu"

import { initMenuExpand, MenuBadge, MenuExpand } from "../../kernel/infra"
import { ToggleMenuExpandInfra, ToggleMenuExpandStore } from "../infra"

import { ToggleMenuExpandPod } from "../method"

import { ToggleMenuExpandEvent } from "../event"

import { MenuCategoryPath } from "../../kernel/data"

interface Toggle {
    (infra: ToggleMenuExpandInfra, store: ToggleMenuExpandStore): ToggleMenuExpandPod
}
export const showMenuExpand: Toggle = modifyMenuExpand((expand, path) => expand.register(path))
export const hideMenuExpand: Toggle = modifyMenuExpand((expand, path) => expand.remove(path))

interface ModifyExpand {
    (expand: MenuExpand, path: MenuCategoryPath): void
}
function modifyMenuExpand(modify: ModifyExpand): Toggle {
    return (infra, store) => (detecter) => (path, post) => {
        const menuExpand = infra.menuExpand(menuExpandRepositoryConverter)

        const fetchMenuExpandResult = store.menuExpand.get()
        const expand = fetchMenuExpandResult.found ? fetchMenuExpandResult.value : initMenuExpand()

        modify(expand, path)

        const storeResult = menuExpand.set(expand)
        if (!storeResult.success) {
            post({ type: "repository-error", err: storeResult.err })
            return
        }

        store.menuExpand.set(expand)

        const fetchMenuBadgeResult = store.menuBadge.get()
        const badge = fetchMenuBadgeResult.found ? fetchMenuBadgeResult.value : EMPTY_BADGE

        post({
            type: "succeed-to-toggle",
            menu: buildMenu({
                version: infra.version,
                menuTree: infra.menuTree,
                menuTargetPath: detecter(),
                menuExpand: expand,
                menuBadge: badge,
            }),
        })
    }
}

export function toggleMenuExpandEventHasDone(_event: ToggleMenuExpandEvent): boolean {
    return true
}

const EMPTY_BADGE: MenuBadge = {}
