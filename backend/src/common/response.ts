export interface UniformResponse<T> {
  statusCode?: number;
  message?: string;
  error?: string;
  data?: T;
}

export const success: <T>(data?: T) => UniformResponse<T> = (data) => {
  return {
    statusCode: 200,
    data,
  };
};

export interface PageResult<T> {
  total: number;
  data: T;
}
