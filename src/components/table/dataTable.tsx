import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { AppDispatch } from "../../redux/reducer/store";
import { getData, removeData, createData } from "../../redux/actions/data/dataActions";
import { reducerGetData, reducerErrors } from "../../redux/reducer/data/reducers/reducerData";

import Loader from "../loader/loader";

import { ReactComponent as IconDelete } from "../../assets/icon-delete.svg";
import { ReactComponent as IconEdit } from "../../assets/icon-edit.svg";

import { dataFormated } from "../../utils/formattedDate";
import styles from "./dataTable.module.scss";

const DataTables = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: any) => state.user.user);
  const { data, error } = useSelector((state: any) => state.data.data);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isOpenInputs, setIsOpenInputs] = useState<boolean>(false);

  const handleClickDelete = (id: string) => {
    setIsPending(true);
    dispatch(removeData(id)).then(() => {
      setIsPending(false);
    });
  };

  const handleChangeItem = (id: string) => {
    setIsOpenInputs(true)
    // setIsPending(true);
    // dispatch(removeData(id)).then(() => {
    //   setIsPending(false);
    // });
  };

  const handleChangeInput = () => {
    
  }

  const handleClickAddButton = () => {
    setIsPending(true);
    dispatch(createData()).then((item: any) => {
      dispatch(reducerGetData(data ? [...data, item.data] : [item.data]));
      setIsPending(false);
    });
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
  console.log(data);
  return (
    <section className={styles.tableWrapper}>
      <div className={clsx(styles.errorPopup, isShow && styles.errorPopup_active)}><p>Произошла ошибка.</p></div>
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
            <th className={styles.table__item_small} />
            <th className={styles.table__item_small} />
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 && data.map((el: any, index: number) => (
            <tr key={index}>
              <td className={styles.table__item}>
                <span>{dataFormated(el.companySigDate)}</span>
              </td>
              <td className={styles.table__item}>
                {isOpenInputs
                  ? <input
                    type="text"
                    defaultValue={el.companySignatureName}
                    className={styles.table__input}
                    onChange={handleChangeInput}
                  />
                  : <span>{el.companySignatureName}</span>}
              </td>
              <td className={styles.table__item}>
                {isOpenInputs
                  ? <input
                    type="text"
                    defaultValue={el.documentName}
                    className={styles.table__input}
                    onChange={handleChangeInput}
                  />
                  : <span>{el.documentName}</span>}
              </td>
              <td className={styles.table__item}>
                {isOpenInputs
                  ? <input
                    type="text"
                    defaultValue={el.documentStatus}
                    className={styles.table__input}
                    onChange={handleChangeInput}
                  />
                  : <span>{el.documentStatus}</span>}
              </td>
              <td className={styles.table__item}>
                {isOpenInputs
                  ? <input
                    type="text"
                    defaultValue={el.documentType}
                    className={styles.table__input}
                    onChange={handleChangeInput}
                  />
                  : <span>{el.documentType}</span>}
              </td>
              <td className={styles.table__item}>
                {isOpenInputs
                  ? <input
                    type="number"
                    defaultValue={el.employeeNumber}
                    className={styles.table__input}
                    onChange={handleChangeInput}
                  />
                  : <span>{el.employeeNumber}</span>}
              </td>
              <td className={styles.table__item}><span>{dataFormated(el.employeeSigDate)}</span></td>
              <td className={styles.table__item}>
                {isOpenInputs
                  ? <input
                    type="text"
                    defaultValue={el.employeeSignatureName}
                    className={styles.table__input}
                    onChange={handleChangeInput}
                  />
                  : <span>{el.employeeSignatureName}</span>}
              </td>
              <td className={styles.table__item_small}>
                <IconEdit
                  className={styles.table__delete}
                  onClick={() => handleChangeItem(el.id)}
                />
              </td>
              <td className={styles.table__item_small}>
                <IconDelete
                  className={styles.table__delete}
                  onClick={() => handleClickDelete(el.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles.addData} onClick={handleClickAddButton}>Добавить</button>
    </section>
  )
}

export default DataTables;