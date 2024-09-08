import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { userLogin } from "../../redux/actions/user/userActions";
import { reducerInputValue, reducerErrors } from "../../redux/reducer/user/reducers/reducerUser";

import { AppDispatch } from "../../redux/reducer/store";

import styles from "./authPage.module.scss";

const AuthPage = () => {

  const dispatch = useDispatch<AppDispatch>();

  const { inputValue, error } = useSelector((state: any) => state.user.user);
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to='/main' />
  }

  const handleClickOnButton = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputValue.login && inputValue.password) {
      dispatch(userLogin(inputValue.login, inputValue.password));
    } else {
      dispatch(reducerErrors(true));
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(reducerInputValue({...inputValue, [name]: value}));
    if (value !== '') {
      dispatch(reducerErrors(false));
    }
  };

  return (
    <section className={styles.section}>
      <form>
        <div className={styles.wrapperInput}>
          <input
            type="text"
            placeholder="Логин"
            name='login'
            onChange={handleChangeInput}
          />
        </div>
        <div className={styles.wrapperInput}>
          <input
            type="text"
            placeholder="Пароль"
            name='password'
            onChange={handleChangeInput}
          />
          {error && <span className={styles.spanError}>Неверный логин или пароль.</span>}
        </div>
        <button onClick={(e: any) => handleClickOnButton(e)}>Войти</button>
      </form>
    </section>
  )
}

export default AuthPage;