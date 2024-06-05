import { useEffect, useState } from "react"



const HomePage = () => {
    const [todos, setTodos] = useState({});
    const getTodos = async () => {
        const res = await fetch('/api/todos');
        const data = await res.json()
        return data
    }
    useEffect(() => {
        getTodos().then((data) => {
            if (data.status === 'success') setTodos(data.todos)
        });

    }, [])

    console.log(todos)

    return (
        <div>HomePage</div>
    )
}

export default HomePage