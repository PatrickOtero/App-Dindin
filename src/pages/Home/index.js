import { useEffect } from 'react'
import Header from '../../components/header'
import ProfileModal from '../../components/header/components/profileModal'
import useUserContext from '../../hooks/useUserContext'
import useLoginContext from '../Login/hooks/requisitions/useLoginContext'
import FiltersContainer from './components/filtersContainer'
import RegistryTable from './components/registryTable/index.js'
import ResumeBox from './components/resumeBox/index.js'
import './styles.css'

const Home = () => {
  const { profileModal, userEdited } = useUserContext()

  const { handleUserLogin } = useLoginContext();

  useEffect(() => {
    handleUserLogin()
}, [userEdited])

  return (
    <div className="Home">
      <div className="home-backdrop"></div>
      <header>
        <Header headerType="Header" />
      </header>
      <main>
      {profileModal && <ProfileModal/>}
        <div className="filters-table-container">
          <section className="filters-section">
            <FiltersContainer />
          </section>
          <section className="table-section">
            <RegistryTable />
          </section>
        </div>
        <section className="resume-section">
          <ResumeBox />
        </section>
      </main>
    </div>
  )
}

export default Home
