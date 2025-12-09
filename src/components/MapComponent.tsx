import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { Box, Typography, Button } from '@mui/material';
import BookingModal from './BookingModal';

// Define location type
type Location = {
  id: number;
  name: string;
  position: [number, number];
  description: string;
};

// Custom sauna hut marker icon
const customIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA2MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMwIDQ1QzMwIDQxIDQ0IDM1IDQ0IDI1QzQ0IDE1IDM2IDUgMzAgNUMyNCA1IDE2IDE1IDE2IDI1QzE2IDM1IDMwIDQxIDMwIDQxWiIgZmlsbD0iIzY1NDMyMSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiLz4KPHJlY3QgeD0iMjAiIHk9IjI4IiB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIGZpbGw9IiM4YjQ1MjEiIHJ4PSIxIi8+CjxwYXRoIGQ9Ik04IDI1SDUyQzUyIDI1IDMwIDggMzAgOEMzMCA4IDggMjUgOCAyNVoiIGZpbGw9IiM3OTU1NDgiLz4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMiIgcj0iMiIgZmlsbD0iI2ZmZmZmZiIvPgo8L3N2Zz4=',
  iconSize: [60, 50],
  iconAnchor: [30, 50],
  popupAnchor: [0, -50],
});

const locations: Location[] = [
  {
    id: 1,
    name: 'Copenhagen',
    position: [55.6761, 12.5683],
    description: 'Our premium location in the heart of Copenhagen',
  },
  {
    id: 2,
    name: 'Frederiksværk',
    position: [55.9726, 12.0286],
    description: 'Scenic location in Frederiksværk',
  },
];

const MapComponent: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedLocation(null);
  };

  return (
    <>
      <Box sx={{ 
        height: '80vh', 
        width: '100vw', 
        mx: 'calc(50% - 50vw)',
        position: 'relative',
        overflow: 'hidden',
        mt: '10vh',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(10,15,27,0.1) 0%, rgba(25,118,210,0.05) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        },
        '& .leaflet-container': {
          height: '100% !important',
          width: '100% !important',
          overflow: 'hidden !important',
        }
      }}>
        <MapContainer
          center={[55.824, 12.2984]} // Centered between Copenhagen and Frederiksværk
          zoom={9}
          style={{ 
            height: '100%', 
            width: '100%', 
            borderRadius: '0',
            filter: 'brightness(1.3) contrast(0.9) saturate(0.8)',
          }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={location.position}
              icon={customIcon}
            >
              <Popup>
                {/* Header with clean design */}
                <Box sx={{
                  background: '#000000',
                  p: 2.5,
                  textAlign: 'center',
                  borderBottom: '1px solid #e0e0e0'
                }}>
                  <Typography variant="h6" sx={{ 
                    color: '#ffffff', 
                    fontWeight: 600, 
                    mb: 0,
                    fontSize: '1.2rem',
                    letterSpacing: '0.5px'
                  }}>
                    {location.name}
                  </Typography>
                </Box>
                
                {/* Content section */}
                <Box sx={{
                  background: '#ffffff',
                  p: 2.5,
                  color: '#000000'
                }}>
                  <Typography variant="body2" sx={{ 
                    color: '#333333', 
                    mb: 2.5,
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    textAlign: 'center',
                    fontWeight: 400
                  }}>
                    {location.description}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleLocationClick(location)}
                    sx={{ 
                      width: '100%',
                      background: '#000000',
                      color: '#ffffff',
                      py: 1.2,
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      borderRadius: '0',
                      textTransform: 'none',
                      boxShadow: 'none',
                      '&:hover': {
                        background: '#333333',
                      }
                    }}
                  >
                    View Available Times
                  </Button>
                </Box>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
      
      <BookingModal
        open={modalOpen}
        onClose={handleCloseModal}
        location={selectedLocation}
      />
    </>
  );
};

export default MapComponent;
