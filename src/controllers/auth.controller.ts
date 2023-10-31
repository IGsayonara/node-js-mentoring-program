import * as AuthService from '../services/auth.service.ts';
export const signIn = async (req, res) => {
  const jwtToken = await AuthService.login({ ...req.body });
  res.formattedSent({ token: jwtToken });
};

export const signUp = async (req, res) => {
  await AuthService.register({ ...req.body });
  res.formattedSent({ success: true });
};
