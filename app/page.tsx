import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'


export default async function Page() {
  const cookieStore: any = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    // 'flex-col' stacks them vertically; 'gap-4' adds spacing
    <div className="flex flex-col gap-8 p-4">
      
      {/* The Form as a Flex Container */}
      <form className="flex flex-wrap flex-col gap-2">
        <input name="Climb" placeholder="Climb" className="flex-1 border border-black p-2" />
        <input name="here" placeholder="here" className="flex-1 border border-black p-2" />
        <input name="here" placeholder="here" className="flex-1 border border-black p-2" />
        <input name="here" placeholder="here" className="flex-1 border border-black p-2" />
        <input name="here" placeholder="here" className="flex-1 border border-black p-2" />
        <input name="here" placeholder="here" className="flex-1 border border-black p-2" />
        
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <section className="mt-4">
        text
      </section>
    </div>
  )
}
  
