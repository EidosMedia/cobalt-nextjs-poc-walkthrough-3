import Layout from "../src/components/Layout/Layout";
import ArticlePage from "../src/components/Page/ArticlePage";
import { getCobaltPageByUrl, getCobaltPreview } from "../src/lib/cobalt-cms/cobalt-api";

export default function Page({cobaltData}){
    const render = (
        <Layout cobaltData={cobaltData}>
            <ArticlePage cobaltData={cobaltData}/>
        </Layout>
    )
    return render;
}

export async function getStaticPaths(){
    const paths = []
    return {
        paths,
        fallback:'blocking' // See https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
    }
}

export async function getStaticProps(context){
    let cobaltData = null;
    if(context.previewData){
        console.log("Preview mode: " + context.previewData)
        cobaltData = await getCobaltPreview(context.previewData)
    } else {
        let url = '/';
    
        if (context.params.url) {
            url = context.params.url.join('/');
        }
        console.log('RENDERING - url: ' + url)

        cobaltData = await getCobaltPageByUrl('my-site', url)  // We're hardcoding the site name here, we'll see how to manage multi-site in another tutorial
    }

    const props = {
        cobaltData
    }

    return {
        props: props, // props (containing cobalt data) passed to the Page component above 
        revalidate: 10 // 10 seconds TTL for caching
    }

}