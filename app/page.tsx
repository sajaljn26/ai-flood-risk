"use client";
import { Camera, Globe, ImageIcon, Loader, Loader2, Map, MapPin, Shield, TrendingUp, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";

export default function Home() {

  const [imagePreview,setImagePreview] = useState<string>("");
  const [selectedImage,setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [alertMessage,setAlertMessage] = useState("");
  const [showAlert,setShowAlert] = useState(false);

  const [isLoading,setIsLoading] = useState(false);
  const [analysisType,setAnalysisType] = useState<"coordinates" | "image">("coordinates");

  const [mapError,setMapError] = useState(false);
  const MapRef = useRef<HTMLInputElement>(null);


  const handleImageUpload = (event : React.ChangeEvent<HTMLInputElement>)=>{
    const file = event.target.files?.[0];
    if(file){
      if(file.size > 10*1024*1024 || !file.type.startsWith("image/")){
        setAlertMessage(file.size > 10*1024*1024 ? 
          "Image size must be less than 10MB"
          : 'Please select a valid image file'); 
        setShowAlert(true);
        return;
      }
      setSelectedImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">
              Flood Detection System
            </h1>
          </div>
          <p className="text-slate-500">Analyze flood risk using coordinates or upload images for AI-powered terrain
            analysis.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* input section */}
          {/* card */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600"></Shield>
                Analysis Methods
              </CardTitle>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="coordinates" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="coordinates" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Coordinates
                  </TabsTrigger>
                  <TabsTrigger value="image" className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Image Analysis
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="coordinates"
               className="mt-4 space-y-4"
               >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input 
                    type="number"
                    id = "latitude"
                    placeholder="Enter latitude" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input 
                    type="number"
                    id = "longitude"
                    placeholder="Enter longitude" />
                  </div>
                </div>
                {/* button */}
                <Button className="w-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  Analyze Coordinates
                </Button>
               </TabsContent>

               <TabsContent value="image"
               className="mt-4 space-y-4"
               >
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-300
                  rounded-lg p-6 text-center">
                    <input ref={fileInputRef} type="file"
                    accept="image/*" onChange={handleImageUpload} className="hidden"/>
                    {!imagePreview ? (
                      <div className="space-y-4">
                          <Upload className="h-12
                          w-12 mx-auto text-slate-400"/>
                          <div>
                            <p className="text-sm font-medium text-slate-700">
                              Upload terrain image
                              </p>
                            <p className="text-xs text-slate-500 mt-1">
                              JPG,PNG, or GIF up to 10MB
                              </p>

                            </div>
                            <Button onClick={()=> fileInputRef.current?.click()}
                              variant="outline"
                              size="sm"
                              >{" "}
                              <Camera
                              className="mr-2 h-4 
                              w-4"/>
                              Choose Image

                            </Button>
                      </div>
                    ):(
                      <div className="space-y-4">
                        <img src={imagePreview} alt="Preview"
                        className="max-h-48 
                        mx-auto rounded-lg
                         shadow-sm"/>
                      </div>
                    )} 
                  </div>
                  {/* button to handle image analysis */}
                  <Button onClick={()=>{}}
                    >
                     <ImageIcon className="mr-2 h-4 w-4"/>
                     Analyze Image
                  </Button>

                      
                </div>

               </TabsContent>

                
              </Tabs>
            </CardContent>
          </Card>
          {/* results section*/}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600"/>
                      Risk Assessment
                    </CardTitle>
                    Risk assessment  
                  </CardHeader> 
                   <CardContent>
                     {isLoading ? (
                       <div className="flex flex-col items-center justify-center py-12">
                         <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4"/>
                         <p className="text-slate-600">
                           {analysisType === 
                           "coordinates" ? "Analyzing coordinates..." : 
                           "Analyzing image..."}</p>
                         
                       </div>
                     ) : (
                       <div className="flex flex-col items-center justify-center py-12">
                         <Shield className="h-16 w-16 text-blue-600 mb-4"/>
                         <p className="text-slate-600 text-center">
                           Choose an analysis method to see flood risk assessment
                         </p>
                       </div>
                     )}
                   </CardContent>
                 </Card>
                 
                 {/* Interactive Map Section */}
                 <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                   <CardHeader>
                     <CardTitle className="flex items-center gap-2">
                       <Globe className="h-5 w-5 text-green-600"/>
                       Interactive Map
                     </CardTitle>
                   </CardHeader>
                   <CardContent>
                     <div className="flex flex-col items-center justify-center py-12">
                       <Map className="h-16 w-16 text-blue-600 mb-4"/>
                       <h3 className="text-lg font-semibold text-slate-700 mb-2">MAP NOT AVAILABLE</h3>
                       <p className="text-slate-500 text-center max-w-md">To enable interactive map, set up a Google Maps API key in .env.local</p>
                     </div>
                   </CardContent>
                 </Card>
        </div>
      </div>
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
                    <AlertDialogTitle>Input Error</AlertDialogTitle>
                    <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>

      </AlertDialog>
    </div>
  );
}
