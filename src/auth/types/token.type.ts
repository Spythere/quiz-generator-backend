export type JwtResponse = {
  access_token: string;
  refresh_token: string;

  data: {
    sub: number;
    email: string;
    iat: number;
    exp: number;
  };
};
