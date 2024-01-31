import { useMsal } from '@azure/msal-react';
import { PageLayout } from './components'
import { Main } from './pages';

export default function App(msal: any) {
  const { accounts } = useMsal()

  console.log('App render', accounts[0], msal);


  return (
    <div className="">
      <PageLayout >
        <Main account={accounts[0]}/>
      </PageLayout>
    </div>

  )
}
