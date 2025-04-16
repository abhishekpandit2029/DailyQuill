import { pusherServer } from '@/helpers/getInitiatedPusher';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { fromUserId, toUserId } = body;

        if (!fromUserId || !toUserId) {
            return NextResponse.json(
                { error: 'Missing fromUserId or toUserId' },
                { status: 400 }
            );
        }

        await pusherServer.trigger(`chat-indicator`, 'user-typing', {
            fromUserId,
        });

        return NextResponse.json({ status: 'ok' });
    } catch (error) {
        console.error('Typing event error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
