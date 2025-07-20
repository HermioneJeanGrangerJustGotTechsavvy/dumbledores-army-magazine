import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ExternalLink } from "lucide-react";

interface Performance {
  id: string;
  title: string;
  artist: string;
  date: string;
  month: string;
  year: string;
  contentType: string;
  link: string;
}

const Performances = () => {
  const [selectedContentType, setSelectedContentType] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [artistFilter, setArtistFilter] = useState<string>("");

  const performances: Performance[] = [
    {
      id: "1",
      title: "Jealousy, Jealousy",
      artist: "Durva Shah",
      date: "July 15, 2025",
      month: "July",
      year: "2025",
      contentType: "Film",
      link: "https://drive.google.com/file/d/1GG7J0oiwow9B9pV6iKw4qdxUivzRla9b/view?usp=sharing"
    }
  ];

  const filteredPerformances = performances.filter((performance) => {
    const matchesContentType = selectedContentType === "all" || performance.contentType === selectedContentType;
    const matchesMonth = selectedMonth === "all" || performance.month === selectedMonth;
    const matchesYear = selectedYear === "all" || performance.year === selectedYear;
    const matchesArtist = artistFilter === "" || performance.artist.toLowerCase().includes(artistFilter.toLowerCase());
    
    return matchesContentType && matchesMonth && matchesYear && matchesArtist;
  });

  const contentTypes = ["Film", "Play", "Performance"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = ["2023", "2024", "2025"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            PERFORMANCES
          </h1>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            YULE BALL AND OTHER ANTICS: A COLLECTION OF PERFORMANCES, PLAYS AND MORE FROM THE HEART OF THE WIZARDING WORLD
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Select value={selectedContentType} onValueChange={setSelectedContentType}>
            <SelectTrigger>
              <SelectValue placeholder="Content Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {contentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Search by artist..."
            value={artistFilter}
            onChange={(e) => setArtistFilter(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Performance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPerformances.map((performance) => (
            <Card key={performance.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                      {performance.title}
                    </h3>
                    <p className="text-muted-foreground">
                      by <span className="font-semibold text-foreground">{performance.artist}</span>
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {performance.contentType}
                    </span>
                    <span>{performance.date}</span>
                  </div>

                  <Button 
                    asChild 
                    className="w-full group-hover:bg-primary/90 transition-colors"
                  >
                    <a 
                      href={performance.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Performance
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPerformances.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No performances found matching your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Performances;