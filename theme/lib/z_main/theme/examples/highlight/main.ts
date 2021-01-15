import { render, h } from "preact"

import { newExampleAsSingle } from "../../../../theme/Example/main/single"

import { Highlight } from "../../../../x_preact/Theme/Examples/Highlight"

import "../../../../../css/getto.css"

render(h(Highlight, { example: newExampleAsSingle() }), document.body)