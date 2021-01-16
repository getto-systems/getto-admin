export type ApiNonce = string & { ApiNonce: never }
export function markApiNonce(nonce: string): ApiNonce {
    return nonce as ApiNonce
}

export type ApiRoles = string[] & { ApiRoles: never }
export function markApiRoles(roles: string[]): ApiRoles {
    return roles as ApiRoles
}

export type LoadResult<T> =
    | Readonly<{ success: false; err: LoadApiCredentialError }>
    | Readonly<{ success: true; found: false }>
    | Readonly<{ success: true; found: true; content: T }>

export type LoadApiCredentialError = Readonly<{ type: "infra-error"; err: string }>
