const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function useApi() {
  const request = async (
    endpoint: string,
    options: RequestInit = {}
  ) => {
    try {
      const headers: Record<string, string> = {
        ...options.headers as Record<string, string>,
      };

      if (options.body) {
        headers['Content-Type'] = 'application/json';
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

  const getSubmissions = async (page: number = 1) => {
    return request(`/submissions?page=${page}`);
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
