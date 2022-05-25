import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getDwxLinkedObjects } from "../../lib/cobalt-cms/cobalt-helpers";
import StoryFragment from "../Fragment/StoryFragment";

export default function Segment({ cobaltData }) {
    const firstObjects = getDwxLinkedObjects(cobaltData, "first");
    const render = (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3} order={{ xs: 2, md: 1 }}>
               <Typography sx={{mt: 2, display:'flex', alignItems:'center',justifyContent:'center'}} variant="h6">First column</Typography>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                {firstObjects.map((object, i) => <StoryFragment key={i} cobaltData={object} />)}
            </Grid>
            <Grid item xs={12} md={3} order={{ xs: 3, md: 3 }}>
            <Typography sx={{mt: 2, display:'flex', alignItems:'center',justifyContent:'center'}} variant="h6">Third column</Typography>
            </Grid>
        </Grid>
    )
    return render;
}