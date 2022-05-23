import RenderFormattedText from "./RenderFormattedText";
import { Box, Container, Typography } from "@mui/material";
import { getImageUrl, ResourceResolver } from "../../utils/ContentUtil";
import Image from "next/image";
import React from "react";

export default function RenderContentElement({ jsonElement, excludeElements, renderMode, cobaltData }) {
    let render = null;
    let id = null;
    if (!excludeElements || !excludeElements.includes(jsonElement.name)) {
        switch (jsonElement.name) {
            case "document":
                render = jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} cobaltData={cobaltData} />);
                break;
            case "headgroup":
                render = jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} cobaltData={cobaltData} />);
                break;
            case "headline":
                render = (
                    <React.Fragment>
                        {jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} renderMode={renderMode} />)}
                    </React.Fragment>
                )
                break;
            case "summary":
                render = (
                    <React.Fragment>
                        {jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} renderMode={renderMode} />)}
                    </React.Fragment>

                )
                break;
            case "content":
                render = (
                    <React.Fragment>
                        {jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} cobaltData={cobaltData} />)}
                    </React.Fragment>
                );
                break;
            case "h1":
                render = (
                    <React.Fragment>
                        {(jsonElement.elements ? jsonElement.elements.map((subel) => subel.text) : null)}
                    </React.Fragment>
                )
                if (renderMode && renderMode === 'styled') {
                    render = (
                        <Container sx={{ my: 1 }} maxWidth="md">
                            <Typography variant="h3" component="h2">
                                {render}
                            </Typography>
                        </Container>
                    )
                }
                break;
            case "h2":
                render = (
                    <React.Fragment>
                        {jsonElement.elements ? jsonElement.elements.map((subel) => subel.text) : null}
                    </React.Fragment>
                )
                if (renderMode && renderMode === 'styled') {
                    render = (
                        <Container sx={{ my: 1 }} maxWidth="md">
                            <Typography variant="h5" component="h3">
                                {render}
                            </Typography>
                        </Container>
                    )
                }
                break;
            case "h3":
                render = (
                    <React.Fragment>
                        {jsonElement.elements ? jsonElement.elements.map((subel) => subel.text) : null}
                    </React.Fragment>
                )
                if (renderMode && renderMode === 'styled') {
                    render = (
                        <Container sx={{ my: 1 }} maxWidth="md">
                            <Typography variant="body1" component="h4">
                                {render}
                            </Typography>
                        </Container>
                    )
                }
                break;
            case "p":
                render = (
                    <React.Fragment>
                        {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} />) : null)}
                    </React.Fragment>
                );
                if (renderMode && renderMode === 'styled') {
                    render = (
                        <Container sx={{ my: 1 }} maxWidth="md">
                            <Typography variant="body1" component="p">
                                {render}
                            </Typography>
                        </Container>
                    )
                }
                break;
            case "ul":
                render = (
                    <React.Fragment>
                        {jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} cobaltData={cobaltData} />) : null}
                    </React.Fragment>
                );
                if (renderMode && renderMode === 'styled') {
                    render = (
                        <Container sx={{ my: 1 }} maxWidth="md" component="ul">
                            {render}
                        </Container>
                    )
                }
                break;
            case "ol":
                render = (
                    <React.Fragment>
                        {jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} cobaltData={cobaltData} />) : null}
                    </React.Fragment>
                );
                if (renderMode && renderMode === 'styled') {
                    render = (
                        <Container sx={{ my: 1 }} maxWidth="md" component="ol">
                            {render}
                        </Container>
                    )
                }
                break;
            case "li":
                // TODO manage nested ul/li/ul/...,
                render = (
                    <React.Fragment>
                        {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} />) : null)}
                    </React.Fragment>
                );
                if (renderMode && renderMode === 'styled') {
                    render = (
                        <Typography sx={{ ml: 4 }} variant='body1' component='li'>
                            {render}
                        </Typography>
                    )
                }
                break;
            case "figure":
                render = <Figure jsonElement={jsonElement} excludeElements={excludeElements} cobaltData={cobaltData} />
                break;
            case 'embed':
                const cdata = jsonElement.elements.filter((el) => el.type = 'CDATA').map((el) => el.cdata)
                render = (
                    <div dangerouslySetInnerHTML={{ __html: cdata }}>
                    </div>
                );
                if (renderMode && renderMode === 'styled') {
                    render = (
                        <Container sx={{ my: 2 }} maxWidth="md" component="div">
                            <Box display="flex"
                                justifyContent="center"
                                alignItems="center">
                                {render}
                            </Box>
                        </Container>
                    )
                }
                break;
            case 'style':
                break;
            default:
                render = null
        }
    }
    return render
}


function Figure({ jsonElement, excludeElements, cobaltData }) {
    let render = null;
    let imageUrl = null;

    try {
        imageUrl = ResourceResolver(getImageUrl(jsonElement, "landscape"), cobaltData.previewData, cobaltData.siteContext.site);
    } catch (e) { }

    const imageWidth = 1024;
    const imageHeight = 576;

    render = (
        <Container sx={{ my: 4 }} maxWidth="md">
            <Box display="flex"
                justifyContent="center"
                alignItems="center">
                <Image src={imageUrl} width={imageWidth} height={imageHeight} />
            </Box>
        </Container>
    )
    return render;
}
