// import useData from '../general/useData'
// import useHomeContext from '../requisitions/useHomeContext'

// const useFiltersLogic = () => {
//   const { allRegistries, setAllRegistries } = useHomeContext()
//   const { filtersList } = useData()
//   const { allTransactions } = allRegistries

//   const handleActivateFiltersProperty = () => {
//     const weekDaysFilter = allTransactions.filter((registry) =>
//       filtersList.some((filter) => filter === registry.weekDay),
//     )
//     const categoryFilter = allTransactions.filter((registry) =>
//       filtersList.some((filter) => filter === registry.category),
//     )

//     let filters = [...allTransactions]

//     if (filtersList.length > 0) {
//       filters = weekDaysFilter(filters)
//     }

//     if (filtersList.length > 0) {
//       filters = categoryFilter(filters)
//     }
//     setAllRegistries({
//       ...allRegistries,
//       filters,
//     })
//   }

//   return { handleActivateFiltersProperty }
// }

// export default useFiltersLogic
