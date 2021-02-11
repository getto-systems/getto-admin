import { MockComponent, MockPropsPasser } from "../../../sub/getto-example/application/mock"
import { ContentComponent, ContentState } from "./component"

export type ContentMockPropsPasser = MockPropsPasser<ContentMockProps>
export type ContentMockProps = Readonly<{ type: "success" }>

export function initMockContentComponent(passer: ContentMockPropsPasser): ContentMockComponent {
    return new ContentMockComponent(passer)
}

class ContentMockComponent extends MockComponent<ContentState> implements ContentComponent {
    constructor(passer: ContentMockPropsPasser) {
        super()
        passer.addPropsHandler((props) => {
            this.post(mapProps(props))
        })

        function mapProps(props: ContentMockProps): ContentState {
            switch (props.type) {
                case "success":
                    return { type: "succeed-to-load", path: "/docs/index.html" }
            }
        }
    }

    load(): void {
        // mock ではなにもしない
    }
}
