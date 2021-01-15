import { env } from "../../../../y_static/env"

import { initCurrentVersionComponent } from "../../currentVersion/impl"

import { find } from "../../../currentVersion/impl/core"

import { NotFoundFactory, initNotFoundResource } from "../impl/core"

import { NotFoundEntryPoint } from "../view"

export function newNotFoundAsSingle(): NotFoundEntryPoint {
    const factory: NotFoundFactory = {
        actions: {
            currentVersion: initCurrentVersionAction(),
        },
        components: {
            currentVersion: initCurrentVersionComponent,
        },
    }
    return {
        resource: initNotFoundResource(factory),
        terminate: () => {
            // worker とインターフェイスを合わせるために必要
        },
    }
}

function initCurrentVersionAction() {
    return {
        find: find({
            currentVersion: env.version,
        }),
    }
}
