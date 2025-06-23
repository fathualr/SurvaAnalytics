import { api } from "@/lib/api"
import { Survei } from "@/features/survey/types"
import { VerifySurveyPayload } from "../types"

export const surveiVerificationAPI = {
  submit: async (id: string): Promise<Survei> => {
    const response = await api.post(`/api/survei/submit-verifikasi/${id}`)
    return response.data.data
  },

  verify: async (
    id: string,
    payload: VerifySurveyPayload
  ): Promise<Survei> => {
    const response = await api.post(`/api/survei/verifikasi/${id}`, payload)
    return response.data.data
  },
}
