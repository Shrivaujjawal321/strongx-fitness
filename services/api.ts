// API Client for StrongX Admin Backend

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    return localStorage.getItem('strongx_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, ...fetchOptions } = options;
    const token = this.getToken();

    // Build URL with query params
    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...fetchOptions.headers,
    };

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    // Handle non-JSON responses (like PDF)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/pdf')) {
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }
      return response.blob() as unknown as T;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'An error occurred');
    }

    return data;
  }

  // GET request
  get<T>(endpoint: string, params?: Record<string, string | number | boolean | undefined>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  // POST request
  post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // PUT request
  put<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // DELETE request
  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient(API_URL);

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ token: string; user: { id: string; email: string; name: string; role: string } }>(
      '/auth/login',
      { email, password }
    ),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get<{ user: { id: string; email: string; name: string; role: string } }>('/auth/me'),
};

// Dashboard API
export const dashboardApi = {
  getSummary: () => api.get('/admin/dashboard/summary'),
  getRevenue: () => api.get('/admin/dashboard/revenue'),
};

// Members API
export const membersApi = {
  getAll: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: string;
  }) => api.get('/members', params),
  getById: (id: string) => api.get(`/members/${id}`),
  create: (data: unknown) => api.post('/members', data),
  update: (id: string, data: unknown) => api.put(`/members/${id}`, data),
  delete: (id: string) => api.delete(`/members/${id}`),
  getMembershipHistory: (id: string) => api.get(`/members/${id}/membership-history`),
  addMembership: (id: string, data: { planId: string; startDate?: string }) =>
    api.post(`/members/${id}/memberships`, data),
};

// Plans API
export const plansApi = {
  getAll: (includeInactive = false) =>
    api.get('/plans', { includeInactive }),
  getById: (id: string) => api.get(`/plans/${id}`),
  create: (data: unknown) => api.post('/plans', data),
  update: (id: string, data: unknown) => api.put(`/plans/${id}`, data),
  delete: (id: string) => api.delete(`/plans/${id}`),
};

// Payments API
export const paymentsApi = {
  getAll: (params?: {
    page?: number;
    limit?: number;
    memberId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }) => api.get('/payments', params),
  getById: (id: string) => api.get(`/payments/${id}`),
  create: (data: unknown) => api.post('/payments', data),
  refund: (id: string) => api.post(`/payments/${id}/refund`),
  getInvoicePdf: async (invoiceId: string) => {
    const blob = await api.get<Blob>(`/payments/invoices/${invoiceId}/pdf`);
    return blob;
  },
};

// Staff API
export const staffApi = {
  getAll: (includeInactive = false) =>
    api.get('/staff', { includeInactive }),
  getById: (id: string) => api.get(`/staff/${id}`),
  create: (data: unknown) => api.post('/staff', data),
  update: (id: string, data: unknown) => api.put(`/staff/${id}`, data),
  delete: (id: string) => api.delete(`/staff/${id}`),
};

// Trainers API
export const trainersApi = {
  getAll: (includeInactive = false) =>
    api.get('/trainers', { includeInactive }),
  getById: (id: string) => api.get(`/trainers/${id}`),
  create: (data: unknown) => api.post('/trainers', data),
  update: (id: string, data: unknown) => api.put(`/trainers/${id}`, data),
  delete: (id: string) => api.delete(`/trainers/${id}`),
};
