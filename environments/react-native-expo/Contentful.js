import { Text } from "react-native";
import { useEffect, useState } from "react";

import { createClient } from "contentful-management"

export default function Contentful() {
  const [result, setResult] = useState("Loading...");

  useEffect(() => {
    const load = async () => {
      try {
        const client = createClient({
          // Never store your Contentful credentials in your projects config file.
          // Use: https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/
          accessToken: process.env.EXPO_PUBLIC_CMA_ACCESS_TOKEN,
        });

        await client.user.getCurrent();
        setResult(`✅ Success!`);
      } catch (err) {
        setResult(`🚫 Error: ${err.message}`);
        throw err;
      }
    };

    load();
  }, []);

  return <Text id="loading-entries">{result}</Text>;
}