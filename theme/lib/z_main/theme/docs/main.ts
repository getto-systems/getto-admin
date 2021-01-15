import { render, h } from "preact"

import { newDocumentAsSingle } from "../../../document/Document/Document/main/single"

import { Document } from "../../../x_preact/Document/Document"

import "../../../../css/getto.css"

render(h(Document, { document: newDocumentAsSingle() }), document.body)