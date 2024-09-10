import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

import clsx from "clsx";

import { AppDispatch } from "../../redux/reducer/store";
import { getData, removeData, createData, setData } from "../../redux/actions/data/dataActions";
import { reducerGetData, reducerErrors, reducerInputValue } from "../../redux/reducer/data/reducers/reducerData";

import Loader from "../loader/loader";

import { ReactComponent as IconDelete } from "../../assets/icon-delete.svg";
import { ReactComponent as IconEdit } from "../../assets/icon-edit.svg";
import { ReactComponent as IconSave } from "../../assets/icon-save.svg";

import { dataFormated } from "../../utils/formattedDate";
import styles from "./dataTable.module.scss";
import { IData, IUserData } from "../../types";

const DataTables = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: { user: { user: IUserData } }) => state.user.user);
  const { data, error, inputValues } = useSelector((state: any) => state.data.data);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isOpenInputs, setIsOpenInputs] = useState<number | null>(null);

  const handleClickDelete = (id: string) => {
    setIsPending(true);
    dispatch(removeData(id)).then(() => {
      setIsPending(false);
    });
  };

  const handleChangeItem = (el: IData, ind: number) => {
    dispatch(reducerInputValue(el));
    setIsOpenInputs(ind);
  };

  const handleChangeSave = (el: IData) => {
    dispatch(setData(el.id)).then(() => {
      setIsOpenInputs(null);
    });
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(reducerInputValue({ ...inputValues, [name]: value }));
  };

  const handleClickAddButton = () => {
    setIsPending(true);
    dispatch(createData()).then((item: IData) => {
      dispatch(reducerGetData(data ? [...data, item] : [item]));
      setIsPending(false);
    });
  };

  const handleClickExitButton = () => {
    localStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    setIsPending(true);
    dispatch(getData()).then(() => {
      setIsPending(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (error) {
      setIsShow(true);
      const timer = setTimeout(() => {
        setIsShow(false);
        dispatch(reducerErrors(false));
      }, 3000);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <section className={styles.tableWrapper}>
      <div className={clsx(styles.errorPopup, isShow && styles.errorPopup_active)}><p>Произошла ошибка.</p></div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleClickAddButton}>Добавить</button>
        <button className={styles.button} onClick={handleClickExitButton}>Выйти</button>
      </div>
      <div className={styles.loaderWrapper}>
        {isPending && <Loader />}
      </div>
      <table className={styles.table}>
        <thead className={styles.table__head}>
          <tr>
            <th className={styles.table__item}><span>Дата подписания компанией</span></th>
            <th className={styles.table__item}><span>Подпись компании</span></th>
            <th className={styles.table__item}><span>Название документа</span></th>
            <th className={styles.table__item}><span>Статус документа</span></th>
            <th className={styles.table__item}><span>Тип документа</span></th>
            <th className={styles.table__item}><span>Номер сотрудника</span></th>
            <th className={styles.table__item}><span>Дата подписания сотрудником</span></th>
            <th className={styles.table__item}><span>Подпись сотрудника</span></th>
            <th className={styles.table__itemSmall} />
            <th className={styles.table__itemSmall} />
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 && data.map((el: IData, index: number) => (
            <tr key={index}>
              <td className={styles.table__itemBig}>
                {isOpenInputs !== null && isOpenInputs === index
                  ? <input
                    type="datetime-local"
                    name="companySigDate"
                    defaultValue={new Date(el.companySigDate).toISOString().slice(0, 16)}
                    className={styles.table__input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e)}
                  />
                  : <span>{dataFormated(el.companySigDate)}</span>}
              </td>
              <td className={styles.table__item}>
                {isOpenInputs !== null && isOpenInputs === index
                  ? <input
                    type="text"
                    name="companySignatureName"
                    defaultValue={el.companySignatureName}
                    className={styles.table__input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e)}
                  />
                  : <span>{el.companySignatureName}</span>}
              </td>
              <td className={styles.table__item}>
                {isOpenInputs !== null && isOpenInputs === index
                  ? <input
                    type="text"
                    name="documentName"
                    defaultValue={el.documentName}
                    className={styles.table__input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e)}
                  />
                  : <span>{el.documentName}</span>}
              </td>
              <td className={styles.table__item}>
                {isOpenInputs !== null && isOpenInputs === index
                  ? <input
                    type="text"
                    name="documentStatus"
                    defaultValue={el.documentStatus}
                    className={styles.table__input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e)}
                  />
                  : <span>{el.documentStatus}</span>}
              </td>
              <td className={styles.table__item}>
                {isOpenInputs !== null && isOpenInputs === index
                  ? <input
                    type="text"
                    name="documentType"
                    defaultValue={el.documentType}
                    className={styles.table__input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e)}
                  />
                  : <span>{el.documentType}</span>}
              </td>
              <td className={styles.table__item}>
                {isOpenInputs !== null && isOpenInputs === index
                  ? <input
                    type="text"
                    name="employeeNumber"
                    defaultValue={el.employeeNumber}
                    className={styles.table__input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e)}
                  />
                  : <span>{el.employeeNumber}</span>}
              </td>
              <td className={styles.table__itemBig}>
                {isOpenInputs !== null && isOpenInputs === index
                  ? <input
                    type="datetime-local"
                    name="employeeSigDate"
                    defaultValue={new Date(el.employeeSigDate).toISOString().slice(0, 16)}
                    className={styles.table__input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e)}
                  />
                  : <span>{dataFormated(el.employeeSigDate)}</span>}
              </td>
              <td className={styles.table__item}>
                {isOpenInputs !== null && isOpenInputs === index
                  ? <input
                    type="text"
                    name="employeeSignatureName"
                    defaultValue={el.employeeSignatureName}
                    className={styles.table__input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e)}
                  />
                  : <span>{el.employeeSignatureName}</span>}
              </td>
              <td className={styles.table__itemSmall}>
                {isOpenInputs !== null && isOpenInputs === index
                  ? <IconSave
                    className={styles.table__delete}
                    onClick={() => handleChangeSave(el)}
                  />
                  : <IconEdit
                    className={styles.table__delete}
                    onClick={() => { handleChangeItem(el, index) }}
                  />}
              </td>
              <td className={styles.table__itemSmall}>
                <IconDelete
                  className={styles.table__delete}
                  onClick={() => handleClickDelete(el.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default DataTables;