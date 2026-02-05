import * as contentful from "contentful-management";

const client = contentful.createClient({
  // Never store your Contentful credentials in your projects config file.
  // Use: https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/
  accessToken: process.env.CMA_ACCESS_TOKEN,
});

client
  .user.getCurrent()
  .then((result) => {
    console.log(`✅ Success mjs - was able to conntect to Contentful Managment api with user ${result.sys.id}!`);
  })
  .catch((err) => {
    console.log(`🚫 Error mjs:`);
    console.log({ err });
    throw err;
  });