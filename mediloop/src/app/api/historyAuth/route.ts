import { cookies } from 'next/headers';
import { verifyWithJose } from '@/db/helpers/jwt';

export async function GET() {
  try {
    const auth = cookies().get('Authorization')?.value;

    if (!auth) {
      return Response.json({ authorized: false }, { status: 401 });
    }

    const [type, token] = auth.split(' ');

    if (type !== 'Bearer') {
      return Response.json({ authorized: false }, { status: 401 });
    }

    await verifyWithJose(token);

    return Response.json({ authorized: true }, { status: 200 });
  } catch (error) {
    return Response.json({ authorized: false }, { status: 401 });
  }
}