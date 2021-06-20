import Place from "../models/place";
import { ADD_PLACE } from "./places-action";

type State = {
  places: Place[];
};

const initialState: State = {
  places: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_PLACE:
      console.log(action.placeData.title);
      const newPlace = new Place(
        new Date().toISOString(),
        action.placeData.title
      );
      return {
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};
