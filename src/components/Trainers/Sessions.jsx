import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Star, User, Dumbbell, Trophy, TrendingUp, UserCircle } from 'lucide-react';
import weightLiftingBanner from '../../../public/assets/weightLiftingBanner-min.jpg'

const TrainerSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({
    totalSessions: 248,
    monthlyClients: 18,
    averageRating: 4.8,
    completionRate: "96%"
  });

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setSessions([
          {
            id: 1,
            
            memberName: "John Smith",
          
            exercise: "Chest & Shoulders",
            date: '2024-11-24',
            startTime: "09:00:00",
            endTime: "10:30:00",
            rating: 5,
            isRated: true,
            intensity: "High",
            calories: 450,
            fitnessGoal: "Muscle Gain",
            progress: "On Track",
            exercises: [
              { name: "Bench Press", sets: "4 sets × 12 reps", weight: "80kg", notes: "Increased weight by 5kg" },
              { name: "Military Press", sets: "3 sets × 10 reps", weight: "45kg", notes: "Form improved" },
              { name: "Lateral Raises", sets: "3 sets × 15 reps", weight: "10kg", notes: "Added drop sets" }
            ],
           
            nextSession: "2024-11-26 09:00:00"
          },
          {
            id: 2,
           
            memberName: "Emma Davis",
            
            exercise: "Back & Biceps",
            date: '2024-11-24',
            startTime: "14:00:00",
            endTime: "15:30:00",
            rating: 4,
            isRated: true,
            intensity: "Medium",
            calories: 380,
            fitnessGoal: "Weight Loss",
            progress: "Needs Attention",
            exercises: [
              { name: "Pull-ups", sets: "4 sets × 8 reps", weight: "Bodyweight", notes: "Used assistance band" },
              { name: "Barbell Rows", sets: "3 sets × 12 reps", weight: "40kg", notes: "Form needs work" },
              { name: "Bicep Curls", sets: "3 sets × 12 reps", weight: "12kg", notes: "Good control" }
            ],
          
            nextSession: "2024-11-27 14:00:00"
          },
        ]);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  const dashboardStats = [
    {
      icon: Trophy,
      label: "Total Sessions",
      value: stats.totalSessions
    },
    {
      icon: User,
      label: "Active Members",
      value: stats.monthlyClients
    },
    {
      icon: Star,
      label: "Avg. Rating",
      value: stats.averageRating
    },
    {
      icon: TrendingUp,
      label: "",
      value: ''
    }
  ];

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
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Member Sessions Dashboard
              </h2>
              <p className="text-white/80 text-lg">
                Track and manage your assigned member training sessions
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {dashboardStats.map((stat, index) => (
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {/* Session Header */}
            <div className="border-b border-gray-100 p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <UserCircle className="w-12 h-12 text-gray-400" />
                  <div>
                    <h3 className="font-medium text-lg text-gray-900">{session.memberName}</h3>
                  </div>
                </div>
                <span className="border border-blue-100 text-gray-700 px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5">
                  <Calendar className="text-red-600 w-4 h-4" />
                  {new Date(session.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>

            {/* Session Details */}
            <div className="p-6 space-y-6">
              {/* Session Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Fitness Goal</div>
                  <div className="font-medium text-gray-900">{session.fitnessGoal}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Progress Status</div>
                  <div className={`font-medium ${session.progress === "On Track" ? "text-green-600" : "text-yellow-600"}`}>
                    {session.progress}
                  </div>
                </div>
              </div>

              {/* Time and Type */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{formatTime(session.startTime)} - {formatTime(session.endTime)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Dumbbell size={18} />
                  <span>{session.exercise}</span>
                </div>
              </div>

              {/* Exercises */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-700">Exercises Completed:</div>
                {session.exercises.map((exercise, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 p-3 rounded-lg space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Dumbbell size={16} className="text-red-500" />
                        <span className="text-sm font-medium text-gray-700">{exercise.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{exercise.sets}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Weight:</span> {exercise.weight}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Notes:</span> {exercise.notes}
                    </div>
                  </div>
                ))}
              </div>

             

              {/* Next Session */}
              {/* <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-red-700">Next Session:</div>
                  <div className="text-sm font-medium text-red-700">
                    {new Date(session.nextSession).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerSessions;