import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { ResourceResolver, findElementsInContentJson, getImageUrl } from "../../utils/ContentUtil";
import RenderContentElement from "../RenderContent/RenderContentElement";

export default function ArticlePage({ cobaltData }) {
    let render = null;

    const headline = cobaltData.object.data.title;
    
    const summary = cobaltData.object.data.summary;
    
    let mainMediaBlock = null;

    let mainPictureElement = null;
    let mainImageUrl = null;
    try {
        mainPictureElement = findElementsInContentJson(['mediagroup'], cobaltData.object.helper.content)[0].elements[0];
        mainImageUrl = ResourceResolver(getImageUrl(mainPictureElement, "landscape"),  cobaltData.previewData, cobaltData.siteContext.site);
    } catch (e) {}

    const imageWidth = 1024;
    const imageHeight = 576;

    if (mainImageUrl) {
        mainMediaBlock = <Image src={mainImageUrl} width={imageWidth} height={imageHeight} />
    }

    // TODO build the main media block 
   
    let content = null;
    try {
        content = <RenderContentElement jsonElement={findElementsInContentJson(['content'], cobaltData.object.helper.content)[0]} renderMode='styled' cobaltData={cobaltData}/>
    } catch (e) {
        console.log(e)
    }
    // TODO build the content render
    
    render = (
        <Container maxWidth="lg">
            <Container sx={{my:2}} maxWidth="md">
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Typography align="center" variant="h3" component="h1" sx={{ fontStyle: 'italic', fontWeight: 'medium'}}>
                        {headline}
                    </Typography>
                </Box>
            </Container>
            {summary ?
                <Container sx={{my:2}} maxWidth="md">
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center">
                        <Typography align="center"  variant="h5" component="h2">
                            {summary}
                        </Typography>
                    </Box>
                </Container>
                : null}
            <Container sx={{my:2}} maxWidth="lg">
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center">
                    {mainMediaBlock}
                </Box>
            </Container>
            {content}
        </Container>
    )
    return render;
}