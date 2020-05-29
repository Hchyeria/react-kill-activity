import React from 'react'
import { useEffect, useState } from 'react'
import {
    observer
  } from 'mobx-react'
import './index.styl'
import Card from '../../components/Card/index'
import item from '../../store/item'
import { get } from '../../utils/request'
import PageLoading from '../../components/Loading/index'

const convertList = (list) => {
    let len = list.length
    let temp = [[], [], []]
    for (let i = 0; i < len; ++i) {
        temp[i % 3].push(list[i])
    }
    return temp
}

const mapArray = Array.apply(null, Array(3))

const App = observer((props) => {
    const [loading, setLoading] = useState(item.list.length === 0);
    const [list, setList] = useState(item.list)
    const [itemList, setItemList] = useState(convertList(list))
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            if (item.list.length === 0) {
                const { data } = await get({ url: 'item/list' })
                setList(data)
                item.setList(data)
                setItemList(convertList(data))
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        <div className="App">
            {
                list && list.length > 0
                ? (
                    <>
                    {
                        mapArray.map((ele, index) => 
                            <div className="card-one">
                                {
                                    itemList[index].length && itemList[index].map(({ id, ...rest }) => (
                                        <Card key={id} id={id} {...rest} />
                                    ))
                                }
                            </div>
                        )
                    }
                    </>
                )
                : <PageLoading />
            }
        </div>
    );
})

export default App;
