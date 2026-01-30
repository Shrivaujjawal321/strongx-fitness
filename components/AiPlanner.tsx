
import React, { useState } from 'react';
import { gemini } from '../services/gemini';
import { Sparkles, Loader2, Dumbbell, Target, Layers } from 'lucide-react';

const AiPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [goal, setGoal] = useState('Build Muscle');
  const [level, setLevel] = useState('Intermediate');
  const [equipment, setEquipment] = useState('Full Gym');
  const [plan, setPlan] = useState<any>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await gemini.generateWorkoutPlan(goal, level, equipment);
      setPlan(data);
    } catch (err) {
      alert("Failed to generate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-dark-card border-y border-neutral-border/20 py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[150px] rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 blur-[150px] rounded-full -ml-48 -mb-48" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-6 font-bold text-xs uppercase tracking-widest">
              <Sparkles size={14} /> AI Powered
            </div>
            <h2 className="font-orbitron text-4xl md:text-6xl font-black text-white uppercase italic leading-tight mb-8">
              Generate Your <br /><span className="text-primary">Custom AI</span> Routine
            </h2>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-neutral-gray uppercase tracking-widest text-xs font-bold">
                  <Target size={14} /> Your Main Goal
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {['Build Muscle', 'Weight Loss', 'Flexibility', 'Endurance'].map(g => (
                    <button 
                      key={g}
                      onClick={() => setGoal(g)}
                      className={`py-4 px-6 rounded-xl border font-bold text-sm transition-all ${goal === g ? 'bg-primary border-primary text-dark' : 'bg-transparent border-neutral-border text-white hover:border-white/40'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-neutral-gray uppercase tracking-widest text-xs font-bold">
                    <Layers size={14} /> Fitness Level
                  </label>
                  <select 
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full bg-dark border border-neutral-border rounded-xl py-4 px-6 text-white outline-none focus:border-primary transition-all"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-neutral-gray uppercase tracking-widest text-xs font-bold">
                    <Dumbbell size={14} /> Equipment
                  </label>
                  <select 
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                    className="w-full bg-dark border border-neutral-border rounded-xl py-4 px-6 text-white outline-none focus:border-primary transition-all"
                  >
                    <option>Full Gym</option>
                    <option>Dumbbells Only</option>
                    <option>Bodyweight</option>
                    <option>Resistance Bands</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-primary text-dark py-6 rounded-2xl font-black uppercase text-sm tracking-[0.2em] shadow-[0_0_40px_-10px_#f0dd35] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Generate Custom Plan'}
              </button>
            </div>
          </div>

          <div className="flex-1">
            {plan ? (
              <div className="bg-dark border border-primary/30 rounded-3xl p-8 h-full">
                <h3 className="font-orbitron text-2xl font-black text-primary uppercase mb-2">{plan.planName}</h3>
                <p className="text-neutral-light/70 text-sm mb-8">{plan.summary}</p>
                
                <div className="space-y-4">
                  {plan.exercises.map((ex: any, i: number) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl group hover:bg-primary/5 hover:border-primary/20 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-orbitron font-bold text-white uppercase group-hover:text-primary transition-colors">{ex.name}</h4>
                        <span className="bg-primary text-dark text-[10px] font-black px-2 py-1 rounded">{ex.sets} Sets × {ex.reps}</span>
                      </div>
                      <p className="text-neutral-gray text-xs italic">Tip: {ex.tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-neutral-border/30 rounded-3xl p-12 h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-neutral-border/10 rounded-full flex items-center justify-center mb-6">
                  <Sparkles size={32} className="text-neutral-border/50" />
                </div>
                <h3 className="font-orbitron text-xl font-black text-neutral-border/50 uppercase mb-2">Your Plan Awaits</h3>
                <p className="text-neutral-border/50 text-sm max-w-xs">Configure your profile on the left and let Gemini generate a scientifically optimized workout just for you.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiPlanner;
