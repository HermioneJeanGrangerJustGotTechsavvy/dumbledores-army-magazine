import { useState, useEffect } from "react";
import { removeBackground } from "@/utils/backgroundRemoval";

interface ProcessedImage {
  id: string;
  originalSrc: string;
  processedSrc: string;
}

interface BackgroundRemovalProcessorProps {
  furnitureItems: Array<{
    id: string;
    imgSrc: string;
  }>;
  onImagesProcessed: (processedImages: ProcessedImage[]) => void;
}

const BackgroundRemovalProcessor = ({ furnitureItems, onImagesProcessed }: BackgroundRemovalProcessorProps) => {
  const [processing, setProcessing] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);

  useEffect(() => {
    const processImages = async () => {
      setProcessing(true);
      const processedImages: ProcessedImage[] = [];

      for (let i = 0; i < furnitureItems.length; i++) {
        const item = furnitureItems[i];
        try {
          console.log(`Processing image ${i + 1} of ${furnitureItems.length}: ${item.id}`);
          
          // Load the image
          const img = new Image();
          img.crossOrigin = "anonymous";
          
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = item.imgSrc;
          });

          // Remove background
          const processedBlob = await removeBackground(img);
          const processedUrl = URL.createObjectURL(processedBlob);

          processedImages.push({
            id: item.id,
            originalSrc: item.imgSrc,
            processedSrc: processedUrl
          });

          setProcessedCount(i + 1);
        } catch (error) {
          console.error(`Failed to process image ${item.id}:`, error);
          // Keep original image if processing fails
          processedImages.push({
            id: item.id,
            originalSrc: item.imgSrc,
            processedSrc: item.imgSrc
          });
        }
      }

      onImagesProcessed(processedImages);
      setProcessing(false);
    };

    if (furnitureItems.length > 0) {
      processImages();
    }
  }, [furnitureItems, onImagesProcessed]);

  if (!processing && processedCount === 0) return null;

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg backdrop-blur-sm z-50">
      <div className="flex items-center gap-3">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        <span className="text-sm">
          {processing 
            ? `Processing furniture images... ${processedCount}/${furnitureItems.length}`
            : "Images processed!"
          }
        </span>
      </div>
    </div>
  );
};

export default BackgroundRemovalProcessor;
