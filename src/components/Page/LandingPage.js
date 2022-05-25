import { Container } from "@mui/material";
import { getDwxLinkedObjects } from "../../lib/cobalt-cms/cobalt-helpers";
import StoryFragment from "../Fragment/StoryFragment";
import Segment from "../Segment/Segment";

export default function LandingPage({ cobaltData }) {
    const mainObjects = getDwxLinkedObjects(cobaltData, "main");
    const render = (
        <Container maxWidth="lg">
            {mainObjects.map((obj, i) => {
                switch (obj.object.data.sys.baseType) {
                    case "article":
                        return <StoryFragment key={i} cobaltData={obj} />;
                        break;
                    case "webpagefragment":
                        return <Segment key={i} cobaltData={obj}/>;
                        break;
                }
            })}
        </Container>
    )
    return render;
}