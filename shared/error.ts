import { AxiosError } from "axios";

export const formatError = (error: AxiosError | Error | null) => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 422) {
      const message = Object.values(error.response?.data ?? {})
        .map((v: any) => {
          return v.map((vv: any) => vv.msg).join(", ");
        })
        .join(". ");
      return message;
    }
    if (typeof error.response?.data === 'string') return error.response?.data
    return Object.values(error.response?.data ?? {})
      .map((v: any) => (typeof v === "string" ? v : v.join(". ")))
      .join(". ");
  }
  return error ? error.name : "";
};
