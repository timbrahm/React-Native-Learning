import Place from "../models/place";
import { ADD_PLACE, SET_PLACES } from "./places-action";

type State = {
  places: Place[];
};

const initialState: State = {
  places: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        places: action.places.map(
          (place: any) =>
            new Place(
              place.id.toString(),
              place.title,
              place.imageUrl,
              place.address,
              place.lat,
              place.lng
            )
        ),
      };
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image,
        action.placeData.address,
        action.placeData.coords.lat,
        action.placeData.coords.lng
      );
      return {
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};
