import LoginButton from '../buttons/LoginButton'

export const LoginCard = () => {
  return (
    <div className='login-card'>

      <div className="login-card__content">
        <div className="login-card__header">
          <h1 className='login-card__header-title'>Welcome Back <br /> to Cup T  <img className="login-card__img" src="logoticket.png" alt="logo" /></h1>
        </div>
        <LoginButton />
      </div>
    </div>


  )
}
