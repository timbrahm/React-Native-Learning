import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch: Function, getState: Function) => {
    // async code
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://rn-learning-89ddb-default-rtdb.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      const loadedUserProducts = loadedProducts.filter((prod: any) => {
        return prod.ownerId === userId;
      });

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedUserProducts,
      });
    } catch (err) {
      // could do something else
      throw err;
    }
  };
};

export const deleteProduct = (productId: any) => {
  return async (dispatch: Function, getState: Function) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-learning-89ddb-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (
  title: any,
  description: any,
  imageUrl: any,
  price: any
) => {
  return async (dispatch: Function, getState: Function) => {
    // async code
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://rn-learning-89ddb-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      },
    });
  };
};

export const updateProduct = (
  id: any,
  title: any,
  description: any,
  imageUrl: any
) => {
  return async (dispatch: Function, getState: Function) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-learning-89ddb-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
