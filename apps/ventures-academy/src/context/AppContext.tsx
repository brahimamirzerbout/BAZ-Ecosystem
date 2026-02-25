
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CourseTrack } from "../data/courseTracks";

interface StoredData {
  completedLessons: string[];
  comments: Record<string, string>;
}

interface AppContextType {
  completedLessons: Set<string>;
  comments: Record<string, string>;
  toggleLesson: (lessonId: string) => void;
  saveComment: (lessonId: string, comment: string) => void;
  calculateProgress: (track: CourseTrack) => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [comments, setComments] = useState<Record<string, string>>({});

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("academy-progress");
    if (stored) {
      const data: StoredData = JSON.parse(stored);
      setCompletedLessons(new Set(data.completedLessons));
      setComments(data.comments || {});
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    const data: StoredData = {
      completedLessons: Array.from(completedLessons),
      comments
    };
    localStorage.setItem("academy-progress", JSON.stringify(data));
  }, [completedLessons, comments]);

  const toggleLesson = (lessonId: string) => {
    setCompletedLessons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId);
      } else {
        newSet.add(lessonId);
      }
      return newSet;
    });
  };

  const saveComment = (lessonId: string, comment: string) => {
    setComments(prev => ({
      ...prev,
      [lessonId]: comment
    }));
  };

  const calculateProgress = (track: CourseTrack) => {
    const totalLessons = track.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedCount = Array.from(completedLessons).filter(lessonId =>
      track.modules.some(module => module.lessons.some(lesson => lesson.id === lessonId))
    ).length;
    return totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  };

  const value: AppContextType = {
    completedLessons,
    comments,
    toggleLesson,
    saveComment,
    calculateProgress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
