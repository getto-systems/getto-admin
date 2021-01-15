import { NotFoundFactory, initNotFoundResource } from "../impl/core"

import { find } from "../../../currentVersion/impl/core"

import { initCurrentVersionComponent } from "../../currentVersion/impl"

import { NotFoundResource } from "../view"

import { CurrentVersionAction } from "../../../currentVersion/action"

export function newNotFoundResource(version: string): NotFoundResource {
    const factory: NotFoundFactory = {
        actions: {
            currentVersion: initCurrentVersionAction(version),
        },
        components: {
            currentVersion: initCurrentVersionComponent,
        },
    }
    return initNotFoundResource(factory)
}

function initCurrentVersionAction(version: string): CurrentVersionAction {
    const infra = {
        currentVersion: version,
    }
    return {
        find: find(infra),
    }
}