import {
    observable,
    action,
} from 'mobx'

interface Detail {
    [id: number]: {
        id: number
        title: string,
        price: number,
        stock: number,
        description: string,
        sales: number,
        imgUrl: string,
        promoStatus: number,
        promoPrice: number,
        promoId: number,
        startDate: string
    }
}

export class Item {

    @observable
    list: object[] = []

    @observable
    detail: Detail = {
    }

    @action
    setList(list: object[]) {
        this.list = list
    }
}

export default new Item()
