import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch: Function, getState: Function) => {
    try {
      const userId = getState().auth.userId;
      const response = await fetch(
        `https://rn-learning-89ddb-default-rtdb.firebaseio.com/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      // could do something else
      throw err;
    }
  };
};

export const addOrder = (cartItems: any, totalAmount: any) => {
  return async (dispatch: Function, getState: Function) => {
    const date = new Date();
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://rn-learning-89ddb-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};