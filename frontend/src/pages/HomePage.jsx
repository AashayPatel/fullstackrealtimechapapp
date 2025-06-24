import { useAuthStore } from '../store/useAuthStore';

const HomePage = () => {
  const {authUser} = useAuthStore()
  return (<div>
    <h2>Welcome to the Home Page!</h2>
  </div>)
}

export default HomePage
