export interface Response {
  status: string;
  message: string;
}

export interface RegisterResponse extends Response {
  data?: {
    email?: string;
    register_token?: string;
  };
}

export interface RegisterInitPayload {
  email: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface CompleteRegisterPayload {
  register_token: string;
  password: string;
  nama: string;
  profil_responden?: Record<string, any>;
  profil_klien?: Record<string, any>;
}
