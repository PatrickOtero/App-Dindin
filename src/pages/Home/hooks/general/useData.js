import { useState } from 'react'

export default function useData() {
  const [weekDayCards] = useState([
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
  ])

  const [categoryCards] = useState([
    'Contas',
    'Depósito',
    'Lazer',
    'TED',
    'Compras',
    'Pix',
    'Alimentação',
  ])

  return {
    weekDayCards,
    categoryCards,
  }
}
