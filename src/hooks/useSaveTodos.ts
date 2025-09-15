import { useContext, useEffect, useState } from "react"
import { TodoContext } from "../contexts/TodoContext"
import { AES, enc } from "crypto-js"
import type { Todo } from "../@types/Todo"

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY as string
const LOCAL_STORAGE_KEY = 'TODOS_DATA'

export const useSaveTodos = () => {
    // Para saber se já buscamos os dados salvos
    const [gottedInitialData, setGottedInitialData] = useState(false)

    // Pegando estado e dispatch do contexto
    const { state, dispatch } = useContext(TodoContext)

    // Função que salva os todos no localStorage
    const handleChangesTodo = () => {
        if (!gottedInitialData) return // Só salva depois que buscar os dados

        const value = AES.encrypt(JSON.stringify(state), SECRET_KEY)
        localStorage.setItem(LOCAL_STORAGE_KEY, value.toString())
    }

    // Busca inicial dos todos salvos
    useEffect(() => {
        try {
            const todosData = localStorage.getItem(LOCAL_STORAGE_KEY)

            if (todosData) {
                const bytes = AES.decrypt(todosData, SECRET_KEY)
                const decryptedData: Todo[] = JSON.parse(bytes.toString(enc.Utf8))

                // Carrega os todos salvos para o estado
                dispatch({ type: 'ADD', payload: decryptedData })
            }
        } catch (error) {
            alert("Não foi possível obter as tarefas salvas")
        }
        setGottedInitialData(true)
    }, [])

    // Salva no localStorage sempre que o state mudar
    useEffect(() => {
        handleChangesTodo()
    }, [state])
}
