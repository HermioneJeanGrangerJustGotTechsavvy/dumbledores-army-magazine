import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays } from "lucide-react";

interface Photo {
  id: string;
  src: string;
  category: "Design" | "Photography";
  photographer?: string;
  date: string;
  month: string;
  year: string;
}

// Helper function to parse year from date string "Month Day, Year"
const getYearFromDateString = (dateString: string): string => {
  const parts = dateString.split(" ");
  if (parts.length > 2) {
    const yearPart = parts[parts.length - 1];
    if (!isNaN(parseInt(yearPart))) {
      return yearPart;
    }
  }
  // Fallback if parsing fails (e.g. if date is just year)
  if (!isNaN(parseInt(dateString))) return dateString;
  // Fallback for unexpected formats, ideally should be handled by data source
  return new Date().getFullYear().toString(); 
};

const PotterPrints = () => {
  const [loaded, setLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedPhotographer, setSelectedPhotographer] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  const photosData: Omit<Photo, 'year'>[] = [
    {
      id: "1",
      src: "/lovable-uploads/383a118f-7791-4ae5-b17c-9cae90ed5e8e.png",
      category: "Photography",
      photographer: "Jiya Doshi",
      date: "June 11, 2025",
      month: "June"
    },
    {
      id: "2", 
      src: "/lovable-uploads/22f02350-8356-4562-a294-a4244d9965ff.png",
      category: "Photography",
      photographer: "Jiya Doshi",
      date: "June 11, 2025",
      month: "June"
    },
    {
      id: "3",
      src: "/lovable-uploads/86d229b0-ae92-4e12-adfd-72fd3b4ec6ba.png",
      category: "Photography",
      photographer: "Jiya Doshi",
      date: "June 11, 2025",
      month: "June"
    },
    {
      id: "4",
      src: "/lovable-uploads/6190f5e7-2ac2-417b-bdb6-184d4af43149.png",
      category: "Photography",
      photographer: "Jiya Doshi",
      date: "June 11, 2025",
      month: "June"
    },
    {
      id: "5",
      src: "/lovable-uploads/9b2f0a60-84c4-40bb-b24c-1ca4b1472a06.png",
      category: "Photography",
      photographer: "Jiya Doshi",
      date: "June 11, 2025",
      month: "June"
    },
    {
      id: "6",
      src: "/lovable-uploads/e9e29ed5-cfff-49a1-ae06-20b17c8dce9b.png",
      category: "Photography",
      photographer: "Jiya Doshi",
      date: "June 11, 2025",
      month: "June"
    },
    {
      id: "7",
      src: "/lovable-uploads/dd75cb0a-174c-4647-bcc8-a15bab3162be.png",
      category: "Photography",
      photographer: "Jiya Doshi",
      date: "June 11, 2025",
      month: "June"
    },
    {
      id: "8",
      src: "/lovable-uploads/eabc358a-bd7c-4852-83dd-a3d6e509efcf.png",
      category: "Photography",
      photographer: "Jiya Doshi",
      date: "June 11, 2025",
      month: "June"
    },
    {
      id: "9",
      src: "/lovable-uploads/820a4f00-8ea4-4a1c-a6c7-a2cce9b515e8.png",
      category: "Photography",
      photographer: "Jiya Doshi",
      date: "June 11, 2025",
      month: "June"
    },
    {
      id: "10",
      src: "/lovable-uploads/9f12ba0c-cbdb-416f-9d89-0000b6961243.png",
      category: "Photography",
      photographer: "Jiya Doshi",
      date: "June 11, 2025",
      month: "June"
    },
    {
      id: "11",
      src: "/lovable-uploads/ad025dee-30e0-4392-aee2-02a0b38496ac.png",
      category: "Photography",
      photographer: "Jiya Doshi",
      date: "June 11, 2025",
      month: "June"
    },
    {
      id: "12",
      src: "/lovable-uploads/7d98b408-c48b-4d55-8ae1-427c99c2e0f9.png",
      category: "Photography",
      photographer: "Jiya Doshi",
      date: "June 11, 2025",
      month: "June"
    },
    {
      id: "13",
      src: "/lovable-uploads/5361879a-90f3-4a44-a983-5d11a964ed23.png",
      category: "Photography",
      photographer: "Jiya Doshi",
      date: "June 11, 2025",
      month: "June"
    },
    {
      id: "14",
      src: "/lovable-uploads/f6acf651-4ebf-4d53-91ca-93b62b7f8782.png",
      category: "Photography",
      photographer: "Jiya Doshi",
      date: "June 11, 2025",
      month: "June"
    },
    {
      id: "15",
      src: "/lovable-uploads/fa576d96-ca5c-40d1-9607-fb77433ae966.png",
      category: "Photography",
      photographer: "Jiya Doshi",
      date: "June 11, 2025",
      month: "June"
    },
    {
      id: "16",
      src: "/lovable-uploads/b8595508-2146-4dcf-a659-9008e5dddd9e.png",
      category: "Photography",
      photographer: "Jiya Doshi",
      date: "June 11, 2025",
      month: "June"
    },
    {
      id: "17",
      src: "/lovable-uploads/1ed40207-5553-4c44-8e24-144f72e3ef62.png",
      category: "Photography",
      photographer: "Jiya Doshi",
      date: "June 11, 2025",
      month: "June"
    },
    {
      id: "18",
      src: "/lovable-uploads/59714ead-4917-4ab2-9cea-b371d6175b96.png",
      category: "Photography",
      photographer: "Jiya Doshi",
      date: "June 11, 2025",
      month: "June"
    },
    {
      id: "19",
      src: "/lovable-uploads/e9fc8da4-4655-4fff-a0ff-2e41f6f9c9f7.png",
      category: "Photography",
      photographer: "Jiya Doshi",
      date: "June 11, 2025",
      month: "June"
    }
  ];

  // Process photos to add year
  const photos: Photo[] = photosData.map(photo => ({
    ...photo,
    year: getYearFromDateString(photo.date)
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const filteredPhotos = photos.filter(photo => {
    if (selectedCategory !== "all" && photo.category !== selectedCategory) return false;
    if (selectedMonth !== "all" && photo.month !== selectedMonth) return false;
    if (selectedPhotographer !== "all" && photo.photographer !== selectedPhotographer) return false;
    if (selectedYear !== "all" && photo.year !== selectedYear) return false;
    return true;
  });

  const months = Array.from(new Set(photos.map(photo => photo.month)));
  const photographers = Array.from(new Set(photos.map(photo => photo.photographer).filter(Boolean)));
  const years = Array.from(new Set(photos.map(photo => photo.year))).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className={`text-center mb-8 transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Potter Prints</h1>
        <p className="text-white max-w-3xl mx-auto mb-8">
          A curated collection of magical designs and photography from the wizarding world.
        </p>
      </div>

      <div className={`flex flex-wrap gap-4 mb-8 transition-all duration-700 delay-200 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px] bg-midnight-dark/70 border-white/20 text-white">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
            <SelectItem value="Photography">Photography</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[200px] bg-midnight-dark/70 border-white/20 text-white">
            <SelectValue placeholder="All Months" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Months</SelectItem>
            {months.map(month => (
              <SelectItem key={month} value={month}>{month}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedPhotographer} onValueChange={setSelectedPhotographer}>
          <SelectTrigger className="w-[200px] bg-midnight-dark/70 border-white/20 text-white">
            <SelectValue placeholder="All Photographers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Photographers</SelectItem>
            {photographers.map(photographer => (
              <SelectItem key={photographer} value={photographer!}>{photographer}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[200px] bg-midnight-dark/70 border-white/20 text-white">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <SelectValue placeholder="All Years" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {years.map(year => (
              <SelectItem key={year} value={year}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredPhotos.length > 0 ? (
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredPhotos.map((photo, index) => (
            <div 
              key={photo.id}
              className={`break-inside-avoid bg-midnight-dark/70 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden shadow-lg transition-all duration-700 delay-${300 + index * 100} transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} hover:scale-105 hover:shadow-xl`}
            >
              <div className="overflow-hidden">
                <img 
                  src={photo.src} 
                  alt={`${photo.category} by ${photo.photographer || 'Unknown'}`}
                  className="w-full h-auto object-contain bg-white transition-transform duration-300"
                />
              </div>
              
              {photo.photographer && (
                <div className="p-4">
                  <p className="text-white/70 text-sm">{photo.date} • by {photo.photographer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl text-white mb-4">No items match your filters</h3>
          <p className="text-white/80">Try adjusting your filter selection to see more content.</p>
        </div>
      )}
    </div>
  );
};

export default PotterPrints;
