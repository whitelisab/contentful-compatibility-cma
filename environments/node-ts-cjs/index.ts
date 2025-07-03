const contentful = require("contentful-management/dist/contentful-management.node.cjs");

const client = contentful.createClient({
  // Never store your Contentful credentials in your projects config file.
  // Use: https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/
  accessToken: process.env.CMA_ACCESS_TOKEN,
});

client
  .getCurrentUser()
  .then((result) =>
    console.log(`✅ Success ts-cjs!`)
  )
  .catch((err) => {
    console.log(`🚫 Error ts-cjs:`);
    console.log(err);
  });
