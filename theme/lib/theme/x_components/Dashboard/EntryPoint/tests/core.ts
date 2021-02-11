import { initTestMenuAction } from "../../../../../auth/x_components/Outline/Menu/tests/core"

import { detectMenuTarget } from "../../../../../auth/x_components/Outline/Menu/impl/location"
import { MenuBadgeSimulator } from "../../../../../auth/permission/menu/impl/remote/menuBadge/simulate"
import { FindSimulator, initSimulateFindClient } from "../../../../allVersions/impl/remote/find/simulate"

import { DashboardCollector, DashboardFactory, initDashboardResource } from "../impl/core"

import { delayed } from "../../../../../z_infra/delayed/core"
import { find } from "../../../../allVersions/impl/core"

import { initBreadcrumbListComponent } from "../../../../../auth/x_components/Outline/breadcrumbList/impl"
import { initMenuListComponent } from "../../../../../auth/x_components/Outline/menuList/impl"
import { initHowToUseComponent } from "../../howToUse/impl"

import { MenuExpandRepository, MenuTree } from "../../../../../auth/permission/menu/infra"
import { AllVersionsActionConfig } from "../../../../allVersions/infra"

import { DashboardResource } from "../entryPoint"

import { AllVersionsAction } from "../../../../allVersions/action"

export type DashboardConfig = Readonly<{
    allVersions: AllVersionsActionConfig
}>
export type DashboardRepository = Readonly<{
    menuExpands: MenuExpandRepository
}>
export type DashboardSimulator = Readonly<{
    menuBadge: MenuBadgeSimulator
    find: FindSimulator
}>
export function newTestDashboardResource(
    version: string,
    currentURL: URL,
    menuTree: MenuTree,
    config: DashboardConfig,
    repository: DashboardRepository,
    simulator: DashboardSimulator
): DashboardResource {
    const factory: DashboardFactory = {
        actions: {
            menu: initTestMenuAction(menuTree, repository.menuExpands, simulator.menuBadge),
            allVersions: initTestAllVersionsAction(version, config.allVersions, simulator.find),
        },
        components: {
            menuList: initMenuListComponent,
            breadcrumbList: initBreadcrumbListComponent,

            howToUse: initHowToUseComponent,
        },
    }
    const collector: DashboardCollector = {
        menu: {
            getMenuTarget: () => detectMenuTarget(version, currentURL),
        },
    }

    return initDashboardResource(factory, collector)
}

function initTestAllVersionsAction(
    version: string,
    config: AllVersionsActionConfig,
    simulator: FindSimulator
): AllVersionsAction {
    const infra = {
        currentVersion: version,
        config: config.find,
        find: initSimulateFindClient(simulator),
        delayed,
    }
    return {
        find: find(infra),
    }
}
