import { xml2json } from "xml-js";

export function buildCobaltDataFromPage(pageData, site, url, previewData) {

    const helper = getCobaltDataHelper(pageData.model.data);

    const cobaltData = {
        object: {
            data: pageData.model.data, //the data of the requested object
            helper: helper, //a helper object, containing the JSONified XML
        },
        pageContext: {
            url: url, // the url of the requested object
            nodes: pageData.model.nodes, //the data of all linked objects 
            resourcesUrls: pageData.resourcesUrls,  //a map of all the resources urls referenced in the object and linked nodes
            nodesUrls: pageData.nodesUrls, //a map of all the nodes urls referenced in the object and linked nodes
        },
        siteContext: {
            site: site
        },
        previewData
    }
    return cobaltData
}

function getCobaltDataHelper(data) {
    let helper = null;
    switch (data.sys.baseType) {
        case "article":
            return getCobaltArticleHelper(data);
            break;
        default:
            return null;
    }
}

function getCobaltArticleHelper(data) {
    let content = null;
    try {
        content = JSON.parse(xml2json(data.files.content.data))
    } catch (e) {
        console.log("error parsing object xml: " + e)
    }

    return {
        content
    };
}