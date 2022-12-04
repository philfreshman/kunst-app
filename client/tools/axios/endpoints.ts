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
