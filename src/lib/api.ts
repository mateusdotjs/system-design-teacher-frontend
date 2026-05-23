import { useAuth } from "@clerk/clerk-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function useApi() {
  const { getToken } = useAuth();

  const request = async (
    endpoint: string,
    options: RequestInit = {}
  ) => {
    try {
      const token = await getToken();

      const headers: Record<string, string> = {
        ...options.headers as Record<string, string>,
      };

      if (options.body) {
        headers['Content-Type'] = 'application/json';
      }

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };

  const getProblems = async () => {
    return request('/problems');
  };

  const getProblem = async (id: string) => {
    return request(`/problems/${id}`);
  };

  const getSubmissions = async () => {
    return request('/submissions');
  };

  const getSubmission = async (id: string) => {
    return request(`/submissions/${id}`);
  };

  const createSubmission = async (problemId: string, diagram: any) => {
    return request('/submissions', {
      method: 'POST',
      body: JSON.stringify({
        problem_id: problemId,
        diagram,
      }),
    });
  };

  return {
    getProblems,
    getProblem,
    getSubmissions,
    getSubmission,
    createSubmission,
  };
}
