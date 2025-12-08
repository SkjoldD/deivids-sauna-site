import { Container, Box, Typography, Fade } from '@mui/material';
import MapComponent from '../components/MapComponent';

const HomePage = () => {
  return (
    <Box sx={{ 
      height: '100vh', 
      bgcolor: '#0a0f1b', 
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Header Section */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '10vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 12,
          pointerEvents: 'none',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontSize: { xs: '1.8rem', md: '2.2rem', lg: '2.5rem' },
              fontWeight: 300,
              color: 'white',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              textAlign: 'center',
            }}
          >
            De Sauna
          </Typography>
        </Container>
      </Box>

      {/* Hero Section - Overlay on Map */}
      <Box
        sx={{
          position: 'absolute',
          top: '10vh',
          left: 0,
          right: 0,
          height: '80vh',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          pt: '5vh',
          zIndex: 10,
          pointerEvents: 'none',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(10,15,27,0.6) 0%, rgba(25,118,210,0.2) 50%, rgba(220,0,78,0.15) 100%)',
            zIndex: 1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: -1,
            left: 0,
            right: 0,
            height: '60px',
            background: 'linear-gradient(to bottom, rgba(10,15,27,0.8) 0%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Fade in timeout={1000}>
            <Box textAlign="center">
              {/* No text content - empty hero section */}
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Map Section - Takes full height */}
      <Box sx={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        zIndex: 1 
      }}>
        <MapComponent />
      </Box>

      {/* Footer */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(10,15,27,0.95) 0%, transparent 100%)',
          backdropFilter: 'blur(20px)',
          zIndex: 11,
          py: { xs: 1.5, md: 3 },
          px: { xs: 3, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          {/* Mobile: Only Contact Info */}
          <Box sx={{ 
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            mb: 1
          }}>
            <Typography
              variant="subtitle2"
              component="h3"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                mb: 0.5,
                fontSize: '0.7rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Contact
            </Typography>
            <Typography
              variant="body2"
              component="p"
              sx={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.7rem',
                lineHeight: 1.3,
              }}
            >
              info@desauna.dk<br />
              +45 12 34 56 78
            </Typography>
          </Box>

          {/* Desktop: Full Footer */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'left',
            mb: 2
          }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  color: 'white',
                  mb: 0.5,
                  fontSize: '1.5rem',
                  fontWeight: 300,
                  letterSpacing: '0.02em',
                }}
              >
                De Sauna
              </Typography>
              <Typography
                variant="body2"
                component="p"
                sx={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.8rem',
                  maxWidth: '250px',
                }}
              >
                Experience authentic Danish wellness
              </Typography>
            </Box>
            
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'row',
              gap: 4,
              alignItems: 'flex-start',
              flex: 1,
              justifyContent: 'flex-end'
            }}>
              <Box sx={{ textAlign: 'right' }}>
                <Typography
                  variant="subtitle2"
                  component="h3"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    mb: 0.5,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Locations
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.75rem',
                    lineHeight: 1.4,
                  }}
                >
                  Copenhagen • Frederiksværk
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: 'right' }}>
                <Typography
                  variant="subtitle2"
                  component="h3"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    mb: 0.5,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Contact
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.75rem',
                    lineHeight: 1.4,
                  }}
                >
                  info@desauna.dk<br />
                  +45 12 34 56 78
                </Typography>
              </Box>
            </Box>
          </Box>
          
          {/* Copyright - Centered */}
          <Box sx={{ 
            textAlign: 'center',
            pt: { xs: 0.5, md: 1 },
            borderTop: { xs: 'none', md: '1px solid rgba(255,255,255,0.1)' },
          }}>
            <Typography
              variant="body2"
              component="p"
              sx={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: { xs: '0.6rem', md: '0.65rem' },
              }}
            >
              © 2024 De Sauna. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
