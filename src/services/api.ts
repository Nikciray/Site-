const API_BASE_URL = 'http://212.8.226.103:8000/api';

export const catalogAPI = {
  async getRoomTypes(params = {}) {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value);
      }
    });

    const url = `${API_BASE_URL}/catalog/room-types?${queryParams.toString()}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
        mode: 'cors',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      return await response.json();
    } catch (e) {
      throw e;
    }
  }
};

// Amenity mapping for icons
export const amenityIcons = {
  tv: "https://c.animaapp.com/6XngsHkc/img/tv-2@2x.png",
  wifi_internet: "https://c.animaapp.com/6XngsHkc/img/wi-fi-2@2x.png",
  refrigerator: "https://c.animaapp.com/6XngsHkc/img/refrigerator-2@2x.png",
  hairdryer: "https://c.animaapp.com/6XngsHkc/img/hair-dryer-2@2x.png",
  microwave: "https://c.animaapp.com/6XngsHkc/img/microwave-2@2x.png",
  iron: "https://c.animaapp.com/6XngsHkc/img/iron-2@2x.png",
  bathroom: "https://c.animaapp.com/6XngsHkc/img/bathroom-2@2x.png",
  bathtub: "https://c.animaapp.com/6XngsHkc/img/bathtub-2@2x.png",
  double_bed: "https://c.animaapp.com/6XngsHkc/img/bed-2@2x.png",
  chairs: "https://c.animaapp.com/6XngsHkc/img/chair-2@2x.png",
  dinner_table: "https://c.animaapp.com/6XngsHkc/img/table-2@2x.png",
  mirror: "https://c.animaapp.com/6XngsHkc/img/mirror-2@2x.png",
  toilet_bowl: "https://c.animaapp.com/6XngsHkc/img/toilet-2@2x.png",
  sink: "https://c.animaapp.com/6XngsHkc/img/sink-2@2x.png",
  shower: "https://c.animaapp.com/6XngsHkc/img/shower-2@2x.png",
  city_view: "https://c.animaapp.com/6XngsHkc/img/view-2@2x.png",
  table: "https://c.animaapp.com/6XngsHkc/img/table-2@2x.png",
  toiletry: "https://c.animaapp.com/6XngsHkc/img/toiletry-2@2x.png",
  oven_cabinet: "https://c.animaapp.com/6XngsHkc/img/oven-2@2x.png",
  oven: "https://c.animaapp.com/6XngsHkc/img/oven-2@2x.png",
  armchiar_bed: "https://c.animaapp.com/6XngsHkc/img/bed-2@2x.png",
  soap_bar: "https://c.animaapp.com/6XngsHkc/img/soap-2@2x.png",
}; 