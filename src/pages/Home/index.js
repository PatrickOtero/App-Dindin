import Header from '../../components/header'
import FiltersContainer from './components/filtersContainer'
import RegistryTable from './components/registryTable/index.js'
import ResumeBox from './components/resumeBox/index.js'
import './styles.css'

const Home = () => {
  return (
    <div className="Home">
      <div className="home-backdrop"></div>
      <header>
        <Header headerType="Header" />
      </header>
      <main>
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
