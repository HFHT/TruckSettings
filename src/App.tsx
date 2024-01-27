import { PageLayout } from './components'
import { Main } from './pages';

export default function App({ settings }: any) {

  console.log('App render');

  return (
    <div className="">
      <PageLayout >
        <Main settings={settings} />
      </PageLayout>
    </div>

  )
}
