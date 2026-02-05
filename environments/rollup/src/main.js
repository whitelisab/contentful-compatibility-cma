import * as contentful from "contentful-management";

window.addEventListener("load", () => {
  const loading = document.getElementById("loading-entries");

  try {
    const client = contentful.createClient({
      // Never store your Contentful credentials in your projects config file.
      // Use: https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/
      accessToken: process.env.CMA_ACCESS_TOKEN,
    });

    client
      .user.getCurrent()
      .then((result) => (loading.innerText = `✅ Success!`))
      .catch((err) => {
        loading.innerText = `🚫 Error: ${err.message}`;
        throw err;
      });
  } catch (err) {
    loading.innerText = `🚫 Error: ${err.message}`;
    throw err;
  }
});
