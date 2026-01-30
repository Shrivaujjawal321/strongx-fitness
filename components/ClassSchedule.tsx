import React, { useState } from 'react';
import { Clock, User } from 'lucide-react';

interface ClassItem {
  id: string;
  name: string;
  time: string;
  duration: string;
  trainer: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  spots: number;
}

interface DaySchedule {
  day: string;
  classes: ClassItem[];
}

const schedule: DaySchedule[] = [
  {
    day: 'Monday',
    classes: [
      { id: '1', name: 'Morning Yoga', time: '06:00', duration: '60 min', trainer: 'Maria Santos', level: 'All Levels', spots: 8 },
      { id: '2', name: 'HIIT Blast', time: '07:30', duration: '45 min', trainer: 'Alex Johnson', level: 'Intermediate', spots: 5 },
      { id: '3', name: 'Kickfit Combat', time: '12:00', duration: '60 min', trainer: 'James Wilson', level: 'Advanced', spots: 12 },
      { id: '4', name: 'Aqua Fitness', time: '18:00', duration: '45 min', trainer: 'Sophie Lee', level: 'Beginner', spots: 15 },
      { id: '5', name: 'Power Lifting', time: '19:30', duration: '90 min', trainer: 'Alex Johnson', level: 'Advanced', spots: 6 }
    ]
  },
  {
    day: 'Tuesday',
    classes: [
      { id: '6', name: 'Spin Class', time: '06:30', duration: '45 min', trainer: 'Marcus Brown', level: 'All Levels', spots: 20 },
      { id: '7', name: 'Vinyasa Flow', time: '09:00', duration: '75 min', trainer: 'Maria Santos', level: 'Intermediate', spots: 10 },
      { id: '8', name: 'Boxing Fundamentals', time: '17:00', duration: '60 min', trainer: 'James Wilson', level: 'Beginner', spots: 8 },
      { id: '9', name: 'Group-X Dance', time: '19:00', duration: '50 min', trainer: 'Marcus Brown', level: 'All Levels', spots: 25 }
    ]
  },
  {
    day: 'Wednesday',
    classes: [
      { id: '10', name: 'Morning Yoga', time: '06:00', duration: '60 min', trainer: 'Maria Santos', level: 'All Levels', spots: 8 },
      { id: '11', name: 'Strength Circuit', time: '08:00', duration: '60 min', trainer: 'Alex Johnson', level: 'Intermediate', spots: 10 },
      { id: '12', name: 'Lap Swimming', time: '12:30', duration: '45 min', trainer: 'Sophie Lee', level: 'All Levels', spots: 12 },
      { id: '13', name: 'Kickfit Cardio', time: '18:30', duration: '45 min', trainer: 'James Wilson', level: 'Intermediate', spots: 15 }
    ]
  },
  {
    day: 'Thursday',
    classes: [
      { id: '14', name: 'HIIT Extreme', time: '06:30', duration: '45 min', trainer: 'Alex Johnson', level: 'Advanced', spots: 8 },
      { id: '15', name: 'Restorative Yoga', time: '10:00', duration: '60 min', trainer: 'Maria Santos', level: 'Beginner', spots: 12 },
      { id: '16', name: 'Swim Technique', time: '16:00', duration: '60 min', trainer: 'Sophie Lee', level: 'Intermediate', spots: 6 },
      { id: '17', name: 'Body Pump', time: '19:00', duration: '60 min', trainer: 'Marcus Brown', level: 'All Levels', spots: 20 }
    ]
  },
  {
    day: 'Friday',
    classes: [
      { id: '18', name: 'Power Yoga', time: '07:00', duration: '60 min', trainer: 'Maria Santos', level: 'Advanced', spots: 10 },
      { id: '19', name: 'Core & Abs', time: '12:00', duration: '30 min', trainer: 'Alex Johnson', level: 'All Levels', spots: 15 },
      { id: '20', name: 'Kickfit MMA', time: '17:30', duration: '75 min', trainer: 'James Wilson', level: 'Advanced', spots: 8 },
      { id: '21', name: 'Friday Night Dance', time: '20:00', duration: '60 min', trainer: 'Marcus Brown', level: 'All Levels', spots: 30 }
    ]
  },
  {
    day: 'Saturday',
    classes: [
      { id: '22', name: 'Weekend Warrior', time: '08:00', duration: '90 min', trainer: 'Alex Johnson', level: 'Intermediate', spots: 12 },
      { id: '23', name: 'Family Swim', time: '10:00', duration: '60 min', trainer: 'Sophie Lee', level: 'All Levels', spots: 20 },
      { id: '24', name: 'Sunset Yoga', time: '17:00', duration: '75 min', trainer: 'Maria Santos', level: 'All Levels', spots: 15 }
    ]
  },
  {
    day: 'Sunday',
    classes: [
      { id: '25', name: 'Gentle Flow', time: '09:00', duration: '60 min', trainer: 'Maria Santos', level: 'Beginner', spots: 12 },
      { id: '26', name: 'Open Swim', time: '11:00', duration: '120 min', trainer: 'Sophie Lee', level: 'All Levels', spots: 25 },
      { id: '27', name: 'Recovery Stretch', time: '16:00', duration: '45 min', trainer: 'Maria Santos', level: 'All Levels', spots: 15 }
    ]
  }
];

const levelColors: Record<string, string> = {
  'Beginner': 'bg-green-500/20 text-green-400',
  'Intermediate': 'bg-yellow-500/20 text-yellow-400',
  'Advanced': 'bg-red-500/20 text-red-400',
  'All Levels': 'bg-primary/20 text-primary'
};

const ClassSchedule: React.FC<{ serviceFilter?: string }> = ({ serviceFilter }) => {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const currentSchedule = schedule.find(s => s.day === selectedDay);

  return (
    <section className="bg-dark py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h4 className="font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">Schedule</h4>
          <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white uppercase italic">
            {serviceFilter ? `${serviceFilter} Class Schedule` : 'Weekly Class Schedule'}
          </h2>
        </div>

        {/* Day Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {schedule.map((day) => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              className={`px-6 py-3 rounded-lg font-jakarta font-bold text-sm uppercase tracking-wider transition-all ${
                selectedDay === day.day
                  ? 'bg-primary text-dark'
                  : 'bg-dark-card border border-neutral-border/30 text-white hover:border-primary hover:text-primary'
              }`}
            >
              {day.day.slice(0, 3)}
            </button>
          ))}
        </div>

        {/* Schedule Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {currentSchedule?.classes.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-dark-card border border-neutral-border/20 rounded-2xl p-6 flex flex-col md:flex-row gap-4 md:items-center justify-between hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center gap-6">
                {/* Time */}
                <div className="text-center min-w-[70px]">
                  <div className="font-orbitron text-2xl font-bold text-primary">{classItem.time}</div>
                  <div className="flex items-center gap-1 text-neutral-gray text-xs">
                    <Clock size={12} />
                    {classItem.duration}
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px h-12 bg-neutral-border/30" />

                {/* Class Info */}
                <div>
                  <h3 className="font-orbitron text-lg font-bold text-white uppercase group-hover:text-primary transition-colors">
                    {classItem.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <User size={14} className="text-neutral-gray" />
                    <span className="font-jakarta text-neutral-gray text-sm">{classItem.trainer}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Level Badge */}
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${levelColors[classItem.level]}`}>
                  {classItem.level}
                </span>

                {/* Spots */}
                <span className="font-jakarta text-neutral-gray text-sm">
                  {classItem.spots} spots
                </span>

                {/* Book Button */}
                <button className="bg-white/5 border border-white/10 text-white px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-primary hover:text-dark hover:border-primary transition-all">
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassSchedule;
