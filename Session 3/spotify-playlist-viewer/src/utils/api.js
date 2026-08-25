export function printZomatoConfig() {
  const apiKey =
    process.env.NEXT_PUBLIC_ZOMATO_API_KEY;

  const apiUrl =
    process.env.NEXT_PUBLIC_ZOMATO_API_URL;

  console.log("Zomato API Key:", apiKey);
  console.log("Zomato API URL:", apiUrl);
}