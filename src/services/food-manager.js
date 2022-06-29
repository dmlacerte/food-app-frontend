import http from "../http-common";
class FoodManagerDataService {
  getAll() {
    return http.get("/myfood");
  }
  get(id) {
    return http.get(`/myfood/${id}`);
  }
  create(data) {
    return http.post("/myfood", data);
  }
  update(id, data) {
    return http.put(`/myfood/${id}`, data);
  }
  delete(id) {
    return http.delete(`/myfood/${id}`);
  }
  deleteAll() {
    return http.delete(`/myfood`);
  }
//   findByName(name) {
//     return http.get(`/tutorials?name=${name}`);
//   }
}
export default new FoodManagerDataService();