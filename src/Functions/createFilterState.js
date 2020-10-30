import { useSelector, useDispatch } from "react-redux";
import { SET_FILTER } from "../../actions/types";

const createFilterState = props => {
  const stateFilter = useSelector(state => state.setFilter);
  const dispatch = useDispatch();

  let filters = ["desc", "st", "eq", "gt", "gte", "ste", "comp", "esc"];
  filters.forEach(f => {
    if (typeof stateFilter[f] === "undefined") {
      dispatch({
        type: SET_FILTER,
        payload: { setKey: f, operator: "=", value1: "", value2: "" }
      });
    }
  });

  return;
};

export default createFilterState;
