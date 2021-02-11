import { lnir, iconClass } from "../../../../z_vendor/icon"
import { MockComponent, MockPropsPasser } from "../../../../sub/getto-example/x_components/Application/mock"

import { MenuListComponent, MenuListState } from "./component"

import { markMenuCategoryLabel, markMenuItem, Menu } from "../../../permission/menu/data"

export type MenuListMockPropsPasser = MockPropsPasser<MenuListMockProps>
export type MenuListMockProps =
    | Readonly<{ type: "success"; label: string; badgeCount: number }>
    | Readonly<{ type: "empty-nonce" }>
    | Readonly<{ type: "bad-request" }>
    | Readonly<{ type: "server-error" }>
    | Readonly<{ type: "bad-response"; err: string }>
    | Readonly<{ type: "infra-error"; err: string }>

export function initMockMenuListComponent(passer: MenuListMockPropsPasser): MenuListMockComponent {
    return new MenuListMockComponent(passer)
}

class MenuListMockComponent extends MockComponent<MenuListState> implements MenuListComponent {
    constructor(passer: MenuListMockPropsPasser) {
        super()
        passer.addPropsHandler((props) => {
            this.post(mapProps(props))
        })

        function mapProps(props: MenuListMockProps): MenuListState {
            switch (props.type) {
                case "success":
                    return { type: "succeed-to-load", menu: menu(props.label, props.badgeCount) }

                default:
                    return { type: "failed-to-load", menu: menu("ホーム", 0), err: props }
            }

            function menu(label: string, badgeCount: number): Menu {
                return [
                    {
                        type: "category",
                        isExpand: true,
                        badgeCount,
                        category: { label: markMenuCategoryLabel("MAIN") },
                        path: [markMenuCategoryLabel("MAIN")],
                        children: [
                            {
                                type: "item",
                                isActive: true,
                                badgeCount,
                                item: markMenuItem({
                                    label,
                                    icon: iconClass(lnir("home")),
                                    href: "/dist/index.html",
                                }),
                            },
                        ],
                    },
                ]
            }
        }
    }

    load() {
        // mock では特に何もしない
    }
    toggle() {
        // mock では特に何もしない
    }
}
