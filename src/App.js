import './app.css'
import FiltersContainer from './components/filtersContainer'
import Header from './components/header'
import RegistryTable from './components/registryTable/index.js'
import ResumeBox from './components/resumeBox/index.js'

const App = () => {
  return (
    <div className="App">
      <header>
        <Header />
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

export default App
