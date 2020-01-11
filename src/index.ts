async function checkRes(res: Response, expectedStatus: number) {
  if (res.status !== expectedStatus) {
    throw new Error(
      `${res.status} ${res.statusText}: ${(await res.text()) ||
        "<no error message>"}`
    );
  }
}

export class JustAuthenticateMe {
  private jamApiUrl: string;
  private jsonHeaders: HeadersInit;

  constructor(appId: string) {
    this.jamApiUrl = `https://api.justauthenticate.me/${appId}/`;
    this.jsonHeaders = {
      "Content-Type": "application/json"
    };
  }

  async initAuth(email: string) {
    const res = await fetch(`${this.jamApiUrl}authenticate`, {
      method: "POST",
      cache: "no-cache",
      headers: this.jsonHeaders,
      body: JSON.stringify({ email })
    });
    await checkRes(res, 200);
  }

  getTokensFromURL(): { idToken: string; refreshToken: string | null } {
    const params = new URL(document.location.href).searchParams;
    return {
      idToken: params.get("idToken"),
      refreshToken: params.get("refreshToken")
    };
  }

  async refresh(refreshToken: string): Promise<string> {
    const res = await fetch(`${this.jamApiUrl}refresh`, {
      method: "POST",
      cache: "no-cache",
      headers: this.jsonHeaders,
      body: JSON.stringify({ refreshToken })
    });
    await checkRes(res, 200);
    return (await res.json()).idToken;
  }

  async deleteRefreshToken(userIdToken: string, refreshToken: string) {
    const res = await fetch(`${this.jamApiUrl}refresh/${refreshToken}`, {
      method: "DELETE",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${userIdToken}`
      }
    });
    await checkRes(res, 204);
  }

  async deleteAllRefreshTokens(userIdToken: string) {
    const res = await fetch(`${this.jamApiUrl}refresh`, {
      method: "DELETE",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${userIdToken}`
      }
    });
    await checkRes(res, 204);
  }
}
