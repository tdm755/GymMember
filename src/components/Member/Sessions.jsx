import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Star, User, Dumbbell, Trophy, TrendingUp } from 'lucide-react';
import weightLiftingBanner from '../../../public/assets/weightLiftingBanner-min.jpg'

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [hoveredRating, setHoveredRating] = useState({ sessionId: null, rating: 0 });

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setSessions([
          {
            id: 1,
            trainer: "Mike Johnson",
            exercise: "Chest & Shoulders",
            date: '2024-11-24',
            startTime: "09:00:00",
            endTime: "10:30:00",
            rating: 0,
            isRated: false,
            intensity: "High",
            calories: 450,
            exercises: [
              { name: "Bench Press", sets: "4 sets × 12 reps" },
              { name: "Military Press", sets: "3 sets × 10 reps" },
              { name: "Lateral Raises", sets: "3 sets × 15 reps" }
            ],
            notes: "Focus on form maintained throughout"
          },
          {
            id: 2,
            trainer: "Sarah Wilson",
            exercise: "Back & Biceps",
            date: '2024-11-24',
            startTime: "14:00:00",
            endTime: "15:30:00",
            rating: 0,
            isRated: false,
            intensity: "Medium",
            calories: 380,
            exercises: [
              { name: "Pull-ups", sets: "4 sets × 8 reps" },
              { name: "Barbell Rows", sets: "3 sets × 12 reps" },
              { name: "Bicep Curls", sets: "3 sets × 12 reps" }
            ],
            notes: "Increased weight on rows"
          },
        ]);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, []);


  const stats = [
    {
      icon: Trophy,
      label: "Total Sessions",
      value: "248"
    },
    {
      icon: Dumbbell,
      label: "This Month",
      value: "12"
    },
    {
      icon: Calendar,
      label: "Streak",
      value: "7 days"
    },
    {
      icon: TrendingUp,
      label: "Progress",
      value: "+15%"
    }
  ];


  const handleRatingChange = (sessionId, newValue) => {
    setSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === sessionId ? { ...session, rating: newValue, isRated: true } : session
      )
    );
  };

  const formatTime = (timeString) => {
    return new Date(`2024-01-01T${timeString}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };




  return (
    <div className="p-4 md:p-6 pb-[110px] bg-gray-50">
      {/* Header */}
      <div className="GymBannerImage relative overflow-hidden rounded-2xl mb-10" style={{ backgroundImage: `url(${weightLiftingBanner})`, backgroundPosition: 'center bottom -27px' }}>
        {/* Main Content Section */}
        <div className="relative z-10 px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left side - Title and Description */}
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Workout Progress
              </h2>
              <p className="text-white/80 text-lg">
                Track your fitness journey and celebrate your achievements
              </p>
            </div>

            {/* Right side - Current Streak Badge */}
            <div className="flex items-center bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm">
              <Trophy className="h-5 w-5 text-yellow-300 mr-2" />
              <span className="text-white font-medium">Current Streak: 7 Days</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 hover:bg-white/20"
              >
                <div className="flex items-center mb-2">
                  <stat.icon className="h-5 w-5 text-white/80 mr-2" />
                  <span className="text-white/80 text-sm">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-white rounded-xl shadow-sm border border-[#f4eded] hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {/* Session Header */}
            <div className="border relative border-[#f4eded] p-4">
              <div className="flex  justify-between items-start text-[#dc2626] mb-2">
                <div className='flex items-center justify-center flex-col pt-7 w-full'>
                  <h3 className="font-medium text-lg mb-1">{session.exercise}</h3>
                </div>
                <span className="border flex items-center justify-center gap-1.5 border-blue-100 text-[#374151] whitespace-nowrap absolute top-1 right-1 px-3 py-1.5 rounded-sm rounded-tr-md text-[13px]">
                  <Calendar className="text-[#dc2626] w-4 h-4" />
                  {new Date(session.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>

            {/* Session Details */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Trainer */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User className="text-gray-400" />
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">Trainer</div>
                    <div className="text-gray-600">{session.trainer}</div>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={18} />
                  <span>{formatTime(session.startTime)} - {formatTime(session.endTime)}</span>
                </div>

                {/* Exercises */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Completed Exercises:</div>
                  <div className="space-y-2">
                    {session.exercises.map((exercise, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Dumbbell size={16} className="text-red-500" />
                          <span className="text-sm text-gray-700">{exercise.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">{exercise.sets}</span>
                      </div>
                    ))}
                  </div>
                </div>



                {/* Rating */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-600 mb-2">
                      {session.isRated ? 'Your Rating:' : 'Rate this session:'}
                    </p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={20}
                          className={`cursor-pointer transition-colors duration-200 ${(hoveredRating.sessionId === session.id && star <= hoveredRating.rating) ||
                            (session.rating && star <= session.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                            } ${session.isRated ? 'opacity-50 cursor-default' : 'hover:text-yellow-400'}`}
                          onClick={() => {
                            if (!session.isRated) {
                              handleRatingChange(session.id, star);
                            }
                          }}
                          onMouseEnter={() => {
                            if (!session.isRated) {
                              setHoveredRating({ sessionId: session.id, rating: star });
                            }
                          }}
                          onMouseLeave={() => {
                            setHoveredRating({ sessionId: null, rating: 0 });
                          }}
                        />
                      ))}
                    </div>
                    {session.isRated && (
                      <p className="text-sm text-gray-500 mt-2">Thanks for rating!</p>
                    )}
                  </div>
                </div>


              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sessions;