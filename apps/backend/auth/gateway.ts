import { APIError, Gateway, Header } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";
import { auth } from "./auth";
import { AuthDto } from "../shared/dto/shared-auth.dto";

interface AuthParams {
  authorization?: Header<"Authorization">;
  cookie?: Header<"Cookie">;
}

const handler = authHandler(async (params: AuthParams): Promise<AuthDto> => {
  const headers = new Headers();
  if (params.authorization) {
    headers.set("Authorization", params.authorization);
  }
  if (params.cookie) {
    headers.set("Cookie", params.cookie);
  }

  const session = await auth.api.getSession({ headers });

  if (!session?.user) {
    throw APIError.unauthenticated("invalid session");
  }

  return {
    userID: session.user.id,
    email: session.user.email,
    name: session.user.name,
  };
});

export const gateway = new Gateway({ authHandler: handler });