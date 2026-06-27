import { useState, useEffect } from 'react';
import { MoodboardItem } from '../types';

let listeners: (() => void)[] = [];

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

export function useMoodboard() {
  const [moodboard, setMoodboard] = useState<MoodboardItem[]>(() => {
    const saved = localStorage.getItem('creatxia_moodboard');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const handleChange = () => {
      const saved = localStorage.getItem('creatxia_moodboard');
      setMoodboard(saved ? JSON.parse(saved) : []);
    };
    listeners.push(handleChange);
    return () => {
      listeners = listeners.filter((l) => l !== handleChange);
    };
  }, []);

  const addToMoodboard = (item: MoodboardItem) => {
    const saved = localStorage.getItem('creatxia_moodboard');
    const currentList: MoodboardItem[] = saved ? JSON.parse(saved) : [];
    if (!currentList.some((i) => i.id === item.id)) {
      const updatedList = [...currentList, item];
      localStorage.setItem('creatxia_moodboard', JSON.stringify(updatedList));
      emitChange();
    }
  };

  const removeFromMoodboard = (id: number) => {
    const saved = localStorage.getItem('creatxia_moodboard');
    const currentList: MoodboardItem[] = saved ? JSON.parse(saved) : [];
    const updatedList = currentList.filter((item) => item.id !== id);
    localStorage.setItem('creatxia_moodboard', JSON.stringify(updatedList));
    emitChange();
  };

  const clearMoodboard = () => {
    localStorage.removeItem('creatxia_moodboard');
    emitChange();
  };

  return {
    moodboard,
    addToMoodboard,
    removeFromMoodboard,
    clearMoodboard,
  };
}
