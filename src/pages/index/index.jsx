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
                        <div className="card-one">
                            {
                                itemList[0].length && itemList[0].map(({ id, ...rest }) => (
                                    <Card key={id} id={id} {...rest} />
                                ))
                            }
                        </div>
                        <div className="card-one">
                            {
                                itemList[1].length && itemList[1].map(({ id, ...rest }) => (
                                    <Card key={id} id={id} {...rest} />
                                ))
                            }
                        </div>
                        <div className="card-one">
                            {
                                itemList[2].length && itemList[2].map(({ id, ...rest }) => (
                                    <Card key={id} id={id} {...rest} />
                                ))
                            }
                        </div>
                    </>
                )
                : <PageLoading />
            }
        </div>
    );
})

export default App;
