import { useHistory } from 'react-router'
import { useRecoilState } from 'recoil'
import { userInfoState } from '../store/login'

const Logout = () => {
  const [, setUserInfo] = useRecoilState(userInfoState)
  const history = useHistory()
  localStorage.removeItem('loginStatus')
  localStorage.removeItem('accessToken')
  setUserInfo({
    userId: null,
    isAuthenticated: false,
    isAdmin: false,
    name: '',
    email: ''
  })
  history.replace('/login')
  return <div>Logging Out...</div>
}
export default Logout
