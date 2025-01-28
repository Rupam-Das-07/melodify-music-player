const BASE_URL = "YOUR_API_ENDPOINT";

export const fetchTop2024Songs = async () => {
  try {
    const response = await fetch(`${BASE_URL}/top-2024`);
    if (!response.ok) {
      throw new Error("Failed to fetch top songs");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching top songs:", error);
    throw error;
  }
};
