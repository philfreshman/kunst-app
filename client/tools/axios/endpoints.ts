import Axios from "./axios";

export default {

  // Artist
  GetArtists() {
    return Axios().get("/api/artist/");
  },
  GetArtist(id: number) {
    return Axios().get(`/api/artist/${id}`);
  },

  // Peace
  GetPeaces() {
    return Axios().get("/api/peace/");
  },
  GetPeace(id: number) {
    return Axios().get(`/api/peace/${id}`);
  },


  // Invoice
  PostInvoice(data: Invoice){
    return Axios().post('/api/invoice/', data)
  },
  GetInvoice(){
    return Axios().get('api/invoice/')
  },


  // Offer
  PostOffer(data: Offer){
    return Axios().post('/api/offer/', data)
  },
  GetOffer(){
    return Axios().get('api/offer/')
  },


  // Order
  PostOrder(data: Order){
    return Axios().post('/api/order/', data)
  },
  GetOrder(){
    return Axios().get('api/order/')
  }



  // CheckPassword(data: any) {
  //   const formData = new FormData();
  //   formData.append("password", data);
  //   return Axios().post("auth/precheckpassword", formData);
  // },
  // Register(data: any) {
  //   return Axios().post("/auth/register", data);
  // },
  // Login(data: any) {
  //   return Axios().post("/auth/login", data);
  // },
  // Authenticate() {
  //   return Axios().get("/auth", {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });
  // },
};

// check what is any
