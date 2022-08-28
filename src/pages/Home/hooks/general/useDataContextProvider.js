import { useState } from 'react'

const useDataContextProvider = () => {
  const [weekDaysList, setWeekDaysList] = useState([])
  const [categoriesList, setCategoriesList] = useState([])
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

  const [weekDayCards] = useState([
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo'
  ])

  const [categoryCards] = useState([
    'Contas',
    'Depósito',
    'Lazer',
    'TED',
    'Compras',
    'Pix',
    'Alimentação'
  ])

  return {
    weekDayCards,
    categoryCards,
    categoriesList,
    setCategoriesList,
    weekDaysList,
    setWeekDaysList,
    minValue,
    maxValue,
    setMinValue,
    setMaxValue
  }
}

export default useDataContextProvider;
