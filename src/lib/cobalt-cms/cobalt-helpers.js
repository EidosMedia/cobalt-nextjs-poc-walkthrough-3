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
        case "webpage":
            return getCobaltWebPageHelper(data);
            break;
        case "webpagefragment":
            return getCobaltWebPageHelper(data);
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

function getCobaltWebPageHelper(data) {

    const zones = Object.keys(data.files.content.data.zones)

    let zonesWithObjects = null;
    try {
        zonesWithObjects = zones.filter((zone) => data.links.pagelink[zone])
            .map((zone) => {
                return {
                    zone: zone,
                    objects: data.links.pagelink[zone].map((link) => {
                        return {
                            linkData: link.metadata,
                            objectId: link.targetId
                        }
                    })
                }
            })
    } catch (e) { }

    return {
        pageTemplate: data.files.content.data.pageTemplate,
        zones: zonesWithObjects
    }
}

export function getDwxLinkedObjects(cobaltData, zoneName) {
    
    let linkedObjects = [];
    try {
        linkedObjects = cobaltData.object.helper.zones
            .find((zone) => zone.zone === zoneName)
            .objects
            .map((link) => {
                // Here we are  build the cobaltData for each linked object
                const objNodeData = cobaltData.pageContext.nodes[link.objectId]

                let linkTemplate = null
                if (link.linkData && link.linkData.template) {
                    linkTemplate = link.linkData.template
                } 
                const linkContext = {
                    linkData: link.linkData,
                    linkTemplate: linkTemplate
                }
                const objCobaltData = buildCobaltDataForNestedObject(objNodeData, cobaltData, linkContext)
                return objCobaltData
            })
    }
    catch (e) {
    }
    return linkedObjects
}

function buildCobaltDataForNestedObject(object, parentCobaltData, linkContext) {
    const cobaltData = {
        object: {
            data: object,
            helper: getCobaltDataHelper(object)
        },
        linkContext,
        siteContext: parentCobaltData.siteContext,
        pageContext: parentCobaltData.pageContext,
        previewData: parentCobaltData.previewData
    }
    return cobaltData
}