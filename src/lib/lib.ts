import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload:any) {
    return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10 sec from now')
    .sign(key);

}

export async function decrypt(input:string):Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256']
    });

    return payload;
}

export async function login(formdata:FormData) {
    const user = { email: formdata.get('email'), name: 'Lee' }

    const expires = new Date(Date.now() + 10 * 100);
    const session = await encrypt({ user, expires });

    cookies().set('session', session, { expires, httpOnly: true })
}

export async function logout() {
    cookies().set('session', '', {expires: new Date(0)})
}

export async function getSession() {
    const session = cookies().get('session')?.value;
    if(!session) return null;
    return await decrypt(session);
}

export async function updateSession(request:NextRequest) {
    const session = request.cookies.get('session')?.value;
    if(!session) return;

    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);
    const res = NextResponse.next();

    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires
    });

    return res;
}