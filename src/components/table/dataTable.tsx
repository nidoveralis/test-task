import { useDispatch, useSelector } from "react-redux";

import { getData } from "../../redux/actions/data/dataActions";

import { AppDispatch } from "../../redux/reducer/store";
import { useEffect } from "react";

const DataTables = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: any) => state.user.user);
  const { data } = useSelector((state: any) => state.data.data);

  console.log(data);
  useEffect(() => {
    dispatch(getData(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <p>wewrdgfd</p>
      <table>
      <thead>
        <tr>
          <th>

          </th>
        </tr>
      </thead>
      <tbody>
      <tr>
          <th>
            
          </th>
        </tr>
      </tbody>
      </table>
    </>
  )
}

export default DataTables;