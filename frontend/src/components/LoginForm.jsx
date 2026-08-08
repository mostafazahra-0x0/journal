const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div className="login-shell">
      <form className="login-card" onSubmit={handleSubmit}>
        <p className="kicker">The Private Ledger</p>
        <h2 className="login-title">Login</h2>
        <div className="login-orbit" aria-hidden="true">✦ ✦ ✦</div>
        <label className="field">
          Username
          <input
            value={username}
            onChange={handleUsernameChange}
            autoComplete="username"
          />
        </label>
        <label className="field">
          Password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="current-password"
          />
        </label>
        <button type="submit" className="btn btn-gold">
          Enter the ledger <span className="btn-arrow" aria-hidden="true">&rarr;</span>
        </button>
      </form>
    </div>
  )
}

export default LoginForm