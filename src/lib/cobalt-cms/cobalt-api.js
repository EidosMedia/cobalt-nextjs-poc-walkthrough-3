import axios from "axios";
import { buildCobaltDataFromPage } from "./cobalt-helpers";

export async function getCobaltPageByUrl(site, url) {

    let pageData = null;
    const requestUrl = '/api/pages/?url=' + url + '&emk.site=' + site
    console.log("Getting cobalt data from " + requestUrl)
    pageData = await cobaltRequest(requestUrl)

    const cobaltData = buildCobaltDataFromPage(pageData, site, url);

    return cobaltData;
}

export async function cobaltRequest(url) {

    let result = null;

    try {
        const options = {
            method: 'GET',
            url: process.env.COBALT_BASE_HOST + url,
            mode: 'no-cors',
        };

        const response = await axios.request(options)
        result = response.data
    }
    catch (e) {
        console.log(e)
    }
    return result
}

export async function getCobaltPreview(previewData) {

    const jwe = previewData['emk.jwe']
    const previewToken = previewData['emk.previewToken']
    const siteName = previewData['emk.site']

    let url = '/api/pages/' + previewData['emk.foreignId']
        + '@eom?emk.site=' +  encodeURIComponent(siteName)
        + '&emk.previewSection=' + previewData['emk.previewSection']
        + '&emk.disableCache=true'

    let pageData = null;

    try {
        const options = {
            method: 'GET',
            url: process.env.COBALT_BASE_HOST + url,
            mode: 'no-cors',
            headers: {
                Authorization: `Bearer ${jwe}`,
                Cookie: "emk.previewToken=" + previewToken + ";"
            }
        };

        const response = await axios.request(options)
        pageData = response.data
    }
    catch (e) {
        console.log(e)
    }

    const previewInfo = {
        previewToken: previewToken,
        jwe: jwe,
        basePreviewUrl: process.env.COBALT_BASE_HOST
    }

    const cobaltData = buildCobaltDataFromPage(pageData, siteName, previewData.url.join('/'), previewInfo);

    return cobaltData;

}