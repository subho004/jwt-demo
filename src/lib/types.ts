export interface JwtHeader {
  alg: string;
  typ: string;
}

export interface JwtPayload {
  sub?: string | number;
  exp?: number;
  [key: string]: any; // Allow additional properties
}

export interface DecodedJwt {
  id: string | number;
  payload: JwtPayload;
  expires_at: Date;
}
