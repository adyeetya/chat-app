import { BiLogOut } from 'react-icons/bi'
import useLogout from '../../hooks/useLogout'

const LogoutButton = () => {
  const { loading, logout } = useLogout()

  return (
    <div className=" mt-2 ">
      {!loading ? (
        <div className="flex gap-4 cursor-pointer " onClick={logout}>
          <BiLogOut className="w-6 h-6 text-white " /> <span>Logout</span>
        </div>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  )
}
export default LogoutButton
