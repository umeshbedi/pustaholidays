import { db } from "@/firebase";

const EXTERNAL_DATA_URL = 'https://jsonplaceholder.typicode.com/posts';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     ${posts
      .map(({ slug }) => {
        return `
       <url>
           <loc>https://pustaholidays.com${`${slug}`}</loc>
       </url>
     `;
      })
      .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site

  const actvtyAndaman = await db.collection("activityAndaman").get();
  const activityDataAndaman = actvtyAndaman.docs.map((act) => {
    const data = act.data()
    return { slug: data.slug }
  })

  const desAndaman = await db.collection('destinationAndaman').get()
  const desEntryAndaman = desAndaman.docs.map((entry) => {
    return { slug: entry.data().slug }
  });

  let allPath = [...desEntryAndaman, ...activityDataAndaman]

  const request = await fetch(EXTERNAL_DATA_URL);
  const posts = await request.json();
  console.log(desEntryAndaman)
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(allPath);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;