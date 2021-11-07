export interface IRequestError extends Error {
  error?: string;
  status?: string | number;
}
