import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { handlePostSignup } from "@/lib/auth/post-signup";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Check if this is first login and auto-connect AI services
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: existingConnections } = await supabase
          .from('ai_connections')
          .select('id')
          .eq('user_id', user.id)
          .limit(1);
        
        if (!existingConnections || existingConnections.length === 0) {
          await handlePostSignup(user.id);
        }
      }
      
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
