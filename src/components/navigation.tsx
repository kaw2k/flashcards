import Link from 'next/link'
import { useRouter } from 'next/router'
import { DATABASE } from 'src/models/state'
import { Cluster } from './every-layout/cluster'

export const Navigation: React.FC = ({}) => {
  const router = useRouter()
  return (
    <Cluster justify="center">
      <Link href="/">
        <a>dashboard</a>
      </Link>
      <Link href="/flashcards">
        <a>flashcards</a>
      </Link>
      <Link href="/verses">
        <a>verses</a>
      </Link>
      <a
        href="#"
        onClick={() => {
          DATABASE.logout()
          DATABASE.init().then(() => {
            router.push('/login')
          })
        }}>
        logout
      </a>
    </Cluster>
  )
}
