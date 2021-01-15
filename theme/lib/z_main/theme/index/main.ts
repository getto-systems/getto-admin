import { render, h } from "preact"

import { newDashboardAsSingle } from "../../../theme/Home/Dashboard/main/single"

import { Dashboard } from "../../../x_preact/Theme/Home/Dashboard"

import "../../../../css/getto.css"

render(h(Dashboard, { dashboard: newDashboardAsSingle() }), document.body)
