import Navbar from './components/ui/navbar/Navbar'
import { getCurrentUser } from '@/lib/session'

async function Home() {
  const user = await getCurrentUser()

  return (
    <div className='px-5 max-w-[1200px] mx-auto'>
      <Navbar/>
    </div>
  )
}

export default Home