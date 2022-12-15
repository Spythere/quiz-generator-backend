export type JwtResponse = {
  access_token: string;
  refresh_token: string;

  data: {
    sub: string;
    email: string;
    iat: number;
    exp: number;
  };
};
