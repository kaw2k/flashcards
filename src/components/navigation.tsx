import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DATABASE } from 'src/models/state'
import { Cluster } from './every-layout/cluster'
import { Stack } from './every-layout/stack'
import { Icon } from './icon'

export const Navigation: React.FC = ({}) => {
  const router = useRouter()

  return (
    <Cluster justify="space-around">
      <Link href="/">
        <a className={clsx('nav-item', router.pathname === '/' && 'active')}>
          <Icon icon="play_lesson" />
          <span>practice</span>
        </a>
      </Link>
      <Link href="/flashcards">
        <a
          className={clsx(
            'nav-item',
            router.pathname === '/flashcards' && 'active'
          )}>
          <Icon icon="dashboard_customize" />
          <span>flashcards</span>
        </a>
      </Link>
      <Link href="/explain">
        <a
          className={clsx(
            'nav-item',
            router.pathname === '/explain' && 'active'
          )}>
          <Icon icon="contact_support" />
          <span>explain</span>
        </a>
      </Link>
      <a
        href="#"
        className="nav-item"
        onClick={() => {
          DATABASE.logout()
          DATABASE.init().then(() => {
            router.push('/login')
          })
        }}>
        <Icon icon="logout" />
        <span>logout</span>
      </a>

      <style jsx>{`
        .nav-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: var(--grayLight);
        }

        a.active {
          color: var(--black);
          text-decoration: none;
        }
      `}</style>
    </Cluster>
  )
}
