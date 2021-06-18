import { ADD_ORDER, SET_ORDERS } from "../actions/orders";
import Order from "../../models/order";

export type State = {
  orders: any;
};

const initialState: State = {
  orders: [],
};

export default (state: State = initialState, action: any) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      };
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }

  return state;
};
