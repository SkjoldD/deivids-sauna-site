import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format } from 'date-fns';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  location: {
    id: number;
    name: string;
    description: string;
  } | null;
}

const BookingModal: React.FC<BookingModalProps> = ({ open, onClose, location }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'month' | 'day'>('month');
  const calendarRef = useRef<FullCalendar>(null);

  // Reset state when modal opens with new location
  useEffect(() => {
    if (open && location) {
      setSelectedDate(null);
      setSelectedTime(null);
      setCurrentView('month');
    }
  }, [open, location]);

  // Generate sample available time slots
  const generateTimeSlots = (date: Date) => {
    const slots = [];
    for (let hour = 9; hour <= 21; hour++) {
      if (hour >= 12 && hour <= 14) continue; // Lunch break
      slots.push({
        id: `${date.toISOString()}-${hour}`,
        title: `${hour}:00 - ${hour + 1}:00`,
        start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, 0),
        end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour + 1, 0),
        backgroundColor: selectedTime === `${hour}:00` ? '#1976d2' : '#4caf50',
        borderColor: selectedTime === `${hour}:00` ? '#1976d2' : '#4caf50',
      });
    }
    return slots;
  };

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.date);
    setSelectedTime(null);
    setCurrentView('day'); // Switch to day view when date is selected

    // Use setTimeout to ensure the calendar has updated its view before navigating
    setTimeout(() => {
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.gotoDate(arg.date);
      }
    }, 0);
  };

  const handleBackToMonth = () => {
    setCurrentView('month');
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime && location) {
      alert(`Booking confirmed for ${location.name} on ${format(selectedDate, 'PPP')} at ${selectedTime}`);
      onClose();
    }
  };

  if (!location) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          m: { xs: 0, sm: 2 },
          height: { xs: '100vh', sm: 'auto' },
          maxHeight: { xs: '100vh', sm: '90vh' },
          maxWidth: { xs: '100%', sm: '700px' },
          width: { xs: '100%', sm: '700px' }
        }
      }}
    >
      <DialogTitle sx={{ 
        pb: { xs: 1, sm: 2 },
        '& .MuiDialogTitle-root': {
          padding: { xs: '16px 24px 8px', sm: '24px' }
        }
      }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
            Book Session - {location.name}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ 
        p: { xs: 2, sm: 3 },
        '&.MuiDialogContent-root': {
          padding: { xs: '8px 24px 16px', sm: '24px' }
        }
      }}>
        <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, color: '#ffffff' }} gutterBottom>
          {location.description}
        </Typography>
        
        <Box sx={{ mt: { xs: 2, sm: 3 } }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="subtitle1" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, color: '#ffffff' }}>
              Select a date and time
            </Typography>
            {currentView === 'day' && (
              <Button 
                startIcon={<ArrowBackIcon />}
                onClick={handleBackToMonth}
                size="small"
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              >
                Back to Calendar
              </Button>
            )}
          </Box>
          
          {currentView === 'month' ? (
            <Box sx={{ 
              '& .fc': {
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              },
              '& .fc-header-toolbar': {
                flexWrap: { xs: 'wrap', sm: 'nowrap' },
                gap: { xs: 1, sm: 0 }
              },
              '& .fc-toolbar-title': {
                fontSize: { xs: '1rem', sm: '1.25rem' }
              },
              '& .fc-button': {
                fontSize: { xs: '0.7rem', sm: '0.875rem' },
                padding: { xs: '4px 8px', sm: '6px 12px' }
              },
              '& .fc-daygrid-day': {
                fontSize: { xs: '0.7rem', sm: '0.875rem' }
              },
              '& .fc-daygrid-day-number': {
                fontSize: { xs: '0.8rem', sm: '1rem' }
              }
            }}>
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridDay'
                }}
                height="400px"
                dateClick={handleDateClick}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                aspectRatio={1.2}
                windowResizeDelay={100}
              />
            </Box>
          ) : (
            // Custom single day view
            <Box sx={{ 
              border: '1px solid #333',
              borderRadius: 1,
              overflow: 'hidden',
              bgcolor: '#1e1e1e'
            }}>
              <Box sx={{ 
                bgcolor: '#2d2d2d', 
                p: 2, 
                borderBottom: '1px solid #333',
                textAlign: 'center'
              }}>
                <Typography variant="h6" sx={{ 
                  fontSize: { xs: '1.1rem', sm: '1.3rem' },
                  color: '#ffffff',
                  fontWeight: 500
                }}>
                  {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </Typography>
              </Box>
              <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                {generateTimeSlots(selectedDate!).map((slot) => (
                  <Box
                    key={slot.id}
                    onClick={() => setSelectedTime(format(slot.start, 'HH:mm'))}
                    sx={{
                      p: 2,
                      borderBottom: '1px solid #333',
                      cursor: 'pointer',
                      bgcolor: selectedTime === format(slot.start, 'HH:mm') ? '#2d2d2d' : '#1e1e1e',
                      '&:hover': {
                        bgcolor: selectedTime === format(slot.start, 'HH:mm') ? '#3d3d3d' : '#2d2d2d'
                      },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Typography variant="body1" sx={{ 
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      color: selectedTime === format(slot.start, 'HH:mm') ? '#90caf9' : '#ffffff',
                      fontWeight: selectedTime === format(slot.start, 'HH:mm') ? 500 : 400
                    }}>
                      {format(slot.start, 'h:mm a')} - {format(slot.end, 'h:mm a')}
                    </Typography>
                    <Box sx={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      bgcolor: selectedTime === format(slot.start, 'HH:mm') ? '#90caf9' : '#4caf50',
                      border: selectedTime === format(slot.start, 'HH:mm') ? '2px solid #90caf9' : '2px solid #4caf50',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }} />
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {selectedDate && selectedTime && (
          <Box sx={{ 
            mt: { xs: 1.5, sm: 2 }, 
            p: { xs: 1.5, sm: 2 }, 
            bgcolor: 'primary.main', 
            color: 'white', 
            borderRadius: 1 
          }}>
            <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              Selected: {format(selectedDate, 'PPP')} at {selectedTime}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ 
        p: { xs: 2, sm: 3 },
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 1, sm: 0 },
        '&.MuiDialogActions-root': {
          padding: { xs: '16px 24px', sm: '8px 24px 24px' }
        }
      }}>
        <Button 
          onClick={onClose} 
          size="small"
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleBooking} 
          variant="contained" 
          disabled={!selectedDate || !selectedTime}
          size="small"
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Confirm Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingModal;
