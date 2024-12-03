export async function compressImage(dataUrl: string): Promise<string> {
  try {
    // Convert base64 to blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    // Create an image bitmap for manipulation
    const imageBitmap = await window.createImageBitmap(blob);
    
    // Target size: max 800px width/height while maintaining aspect ratio
    const maxSize = 800;
    let width = imageBitmap.width;
    let height = imageBitmap.height;
    
    if (width > maxSize || height > maxSize) {
      if (width > height) {
        height = Math.round((height * maxSize) / width);
        width = maxSize;
      } else {
        width = Math.round((width * maxSize) / height);
        height = maxSize;
      }
    }

    // Create canvas for compression
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    // Draw and compress
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }
    
    ctx.drawImage(imageBitmap, 0, 0, width, height);
    
    // Convert to base64 with reduced quality
    return canvas.toDataURL('image/jpeg', 0.7);
  } catch (error) {
    console.error('Error compressing image:', error);
    return dataUrl; // Return original image if compression fails
  }
}