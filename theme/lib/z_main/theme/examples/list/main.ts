import { render, h } from "preact"

import { newExampleAsSingle } from "../../../../theme/Example/main/single"

import { List } from "../../../../x_preact/Theme/Examples/List"

import "../../../../../css/getto.css"

render(h(List, { example: newExampleAsSingle() }), document.body)