import { useState, useEffect } from 'react';
import { Project } from '../types';
import { fetchProjects } from '../services/api';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        if (isMounted) {
          setProjects(data);
          setError(null);
        }
      } catch (err: any) {
        console.error('Failed to load projects inside useProjects hook:', err);
        if (isMounted) {
          setProjects([]);
          setError(err.message || 'Failed to load projects');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return { projects, loading, error };
};
