import "../../theme/css"
import { render, h } from "preact"

import { foregroundOutsideFeature } from "../x_outside_feature/common"

import { newDashboardView } from "../../theme/action_dashboard/init"

import { DashboardEntry } from "../../theme/action_dashboard/x_preact/dashboard"

render(h(DashboardEntry, newDashboardView(foregroundOutsideFeature())), document.body)
