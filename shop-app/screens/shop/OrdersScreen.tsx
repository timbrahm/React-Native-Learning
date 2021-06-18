import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import * as ordersActions from "../../store/actions/orders";
import Colors from "../../constants/Colors";

export type Props = {
  navigation: any;
};

interface NavComponent extends React.FC<Props> {
  navigationOptions?: Object;
}

const OrdersScreen: NavComponent = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const orders = useSelector((state: any) => state.orders.orders);

  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      await dispatch(ordersActions.fetchOrders());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadData);

    return () => {
      willFocusSub.remove();
    };
  }, [loadData]);

  useEffect(() => {
    loadData();
  }, [dispatch, loadData]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={{ textAlign: "center", fontSize: 24 }}>
          No Orders Found!
        </Text>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          Maybe start ordering some products...
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = (navData: any) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
