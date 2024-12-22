import { Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ChatScreen from './chats/ChatScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import ResetPasswordScreen from './screens/ResetPasswordScreen'
import ProtectedRoute from './components/ProtectedRoute'
import CreateWorkspaceScreen from './screens/CreateWorkspaceScreen'
import WorkspaceScreen from './screens/WorkspaceScreen'
import ChannelChats from './canales/ChannelChats'

function App() {

  return (
    <>
      <Routes>
        <Route path='/register' element={<RegisterScreen />}></Route> {/* > */}
        <Route path='/' element={<LoginScreen />}></Route> {/* > */}
        <Route path='/forgot-password' element={<ForgotPasswordScreen />}></Route> {/* > */}
        <Route path='/reset-password/:reset_token' element={<ResetPasswordScreen />}></Route> {/* > */}
        <Route element={<ProtectedRoute/>}>
          <Route path='/home' element={<HomeScreen />}></Route>
          <Route path='/chat/:chatId' element={<ChatScreen />}></Route>
          <Route path='/create-workspace' element={<CreateWorkspaceScreen/>}></Route>
          <Route path='/workspace/:workspace_id' element={<WorkspaceScreen/>}></Route>
          <Route path='/workspace/:channel_name/:channel_id' element={<ChannelChats/>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
