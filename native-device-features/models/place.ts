class Place {
  id: string;
  title: string;
  imageUrl: string;
  address: string;
  lat: number;
  lng: number;

  constructor(
    id: string,
    title: string,
    imageUrl: string,
    address: string,
    lat: number,
    lng: number
  ) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.address = address;
    this.lat = lat;
    this.lng = lng;
  }
}

export default Place;
