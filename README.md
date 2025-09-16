# AI Flood Detection System

A comprehensive flood risk assessment system that combines coordinate-based analysis and AI-powered image analysis to evaluate flood risk in specific locations.

## Features

- **Coordinate Analysis**: Enter latitude/longitude coordinates to get flood risk assessment
- **Image Analysis**: Upload terrain images for AI-powered flood risk evaluation
- **Interactive Map**: Visualize locations and risk levels on Google Maps
- **Risk Assessment**: Get detailed risk levels (Low, Medium, High, Very High) with recommendations
- **Real-time Analysis**: Connect to backend API for live flood risk calculations

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Python FastAPI
- **Maps**: Google Maps JavaScript API
- **AI**: Image analysis for terrain evaluation

## Getting Started

### Prerequisites

- Node.js 18+ 
- Python 3.8+
- Google Maps API key

### Environment Setup

1. Copy the environment template:
```bash
cp .env.local.example .env.local
```

2. Add your Google Maps API key to `.env.local`:
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view the application

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start the backend server:
```bash
python start.py
```

The backend API will be available at `http://localhost:8000`

## Usage

### Coordinate Analysis
1. Select "Coordinates" tab
2. Enter latitude and longitude values
3. Click "Analyze Coordinates" to get flood risk assessment

### Image Analysis
1. Select "Image Analysis" tab
2. Upload a terrain image (JPG, PNG, GIF up to 10MB)
3. Click "Analyze Image" for AI-powered flood risk evaluation

### Map Visualization
- View analyzed locations on the interactive map
- Risk levels are color-coded: Green (Low), Yellow (Medium), Orange (High), Red (Very High)
- Circles indicate risk zones around analyzed points

## API Endpoints

- `POST /api/analyze/coordinates` - Analyze flood risk by coordinates
- `POST /api/analyze/image` - Analyze flood risk from uploaded image

## Project Structure

```
my-app/
├── app/                 # Next.js app directory
├── components/          # Reusable UI components
├── backend/             # Python FastAPI backend
│   ├── main.py         # Main API server
│   ├── start.py        # Server startup script
│   └── requirements.txt # Python dependencies
├── lib/                 # Utility functions
└── public/             # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
