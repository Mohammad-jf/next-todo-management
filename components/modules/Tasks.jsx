import React from 'react'
import { RiMastodonLine } from 'react-icons/ri'


const Tasks = ({ data, next, back, getTodos }) => {
    return (
        <div className='tasks'>
            {data?.map((item) => (
                <div key={item._id} className='tasks__card'>
                    <span className={item.status}></span>
                    <RiMastodonLine />
                    <h4>{item.title}</h4>
                    <div>
                        {back ? <button className='button-back'>Back</button> : null}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Tasks