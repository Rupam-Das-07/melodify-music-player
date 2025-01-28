import ColorThief from "colorthief";

export const extractColors = async (imageUrl) => {
  try {
    const img = new Image();
    img.crossOrigin = "Anonymous";

    return new Promise((resolve, reject) => {
      img.onload = () => {
        try {
          const colorThief = new ColorThief();
          // Create a canvas to ensure the image is properly loaded
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const dominantColor = colorThief.getColor(img);
          const palette = colorThief.getPalette(img, 3);

          resolve({
            primary: `rgb(${dominantColor.join(",")})`,
            palette: palette.map((color) => `rgb(${color.join(",")})`),
          });
        } catch (error) {
          console.error("Error processing image:", error);
          resolve({
            primary: "rgb(123, 104, 238)", // Fallback color
            palette: ["rgb(123, 104, 238)"],
          });
        }
      };

      img.onerror = () => {
        console.error("Error loading image");
        resolve({
          primary: "rgb(123, 104, 238)", // Fallback color
          palette: ["rgb(123, 104, 238)"],
        });
      };

      img.src = imageUrl;
    });
  } catch (error) {
    console.error("Error extracting colors:", error);
    return {
      primary: "rgb(123, 104, 238)", // Fallback color
      palette: ["rgb(123, 104, 238)"],
    };
  }
};
