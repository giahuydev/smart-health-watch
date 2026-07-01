import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Lưu vào Supabase bảng tracking_events
    const { error: supabaseError } = await supabase
      .from('tracking_events')
      .insert([
        {
          event_type: body.event,
          event_data: body.data,
          created_at: body.timestamp || new Date().toISOString()
        }
      ]);

    if (supabaseError) {
      console.error('Supabase Tracking Error:', supabaseError);
      // Vẫn log ra terminal để debug nhanh
      console.log('\n📊 [User Tracking Event (Fallback)]:', body.event, body.data);
    } else {
      console.log('\n✅ [Supabase] Đã lưu Tracking Event:', body.event);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process tracking data' }, { status: 400 });
  }
}
