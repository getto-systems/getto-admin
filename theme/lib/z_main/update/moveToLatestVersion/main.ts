import { h, render } from "preact"

import { newMoveToNextVersionAsSingle } from "../../../update/Update/MoveToNextVersion/main/single"

import { MoveToLatestVersion } from "../../../x_preact/Update/MoveToLatestVersion/MoveToLatestVersion"

import "../../../../css/getto.css"

render(h(MoveToLatestVersion, { moveToNextVersion: newMoveToNextVersionAsSingle() }), document.body)
