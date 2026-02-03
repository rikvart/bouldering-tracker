import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore: any = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <div>
    <ul>
      {todos?.map((todo) => (
        <li>{todo}</li>
      ))}
    </ul>
    <section>
      text
    </section>
    </div>
  )
}