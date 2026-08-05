export default function useUser() {
  async function fetchUser() {
    const response = await fetch("/api/v1/user");
    const responseBody = await response.json();

    if (response.status === 200) {
      const cachedUserProperties = {
        id: responseBody.id,
        username: responseBody.username,
        features: responseBody.features,
        cacheTime: Date.now(),
      };

      localStorage.setItem("user", JSON.stringify(cachedUserProperties));
    }
  }

  return { fetchUser };
}
