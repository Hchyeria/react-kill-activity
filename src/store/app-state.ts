import {
    observable,
    action,
} from 'mobx'
import { success } from '../utils/Message'
interface UserInfo {
    [other: string]: string | number
}

export class AppState {
    @observable isLogin = !!localStorage.getItem('token')
    @observable isLoading = false

    @observable
    user: UserInfo = {
    }


    @action
    login = () => {
        this.isLogin = true
    }

    @action
    logout = () => {
        localStorage.clear()
        this.isLogin = false
        success('Logout Successfully!')
    }
}


export default new AppState()
