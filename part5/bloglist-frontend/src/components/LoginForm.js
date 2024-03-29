import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => (
  <>
    <h2>log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username: <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange} />
      </div>
      <div>
        password: <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange} />
      </div>
      <button id='loginBtn' type="submit">login</button>
    </form>
  </>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm