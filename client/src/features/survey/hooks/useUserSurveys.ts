import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userSurveiService } from '../api/user';
import {
  Survei,
  CreateUserSurveiPayload,
  UpdateUserSurveiPayload,
  SurveyListResponse,
} from '../types';

export const useUserSurveys = (params?: Record<string, any>) => {
  return useQuery<SurveyListResponse>({
    queryKey: ['user-surveys', params],
    queryFn: () => userSurveiService.getAll(params),
  });
};

export const useUserSurvey = (id: string) => {
  return useQuery<Survei>({
    queryKey: ['user-survey', id],
    queryFn: () => userSurveiService.getById(id),
    enabled: !!id,
  });
};

export const useCreateUserSurvey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUserSurveiPayload) =>
      userSurveiService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-surveys'] });
    },
  });
};

export const useUpdateUserSurvey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateUserSurveiPayload;
    }) => userSurveiService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['user-survey', id] });
      queryClient.invalidateQueries({ queryKey: ['user-surveys'] });
    },
  });
};

export const useDeleteUserSurvey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userSurveiService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-surveys'] });
    },
  });
};
