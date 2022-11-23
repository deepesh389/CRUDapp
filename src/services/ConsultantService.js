import axios from 'axios';

const Consultant_API_BASE_URL = 'http://localhost:8080/all';
const URL = 'http://localhost:8080/add';
const Update_URL = 'http://localhost:8080/update';
const delete_url = 'http://localhost:8080/delete';

class ConsultantService {
    getConsultant() {
        return axios.get(Consultant_API_BASE_URL);
    }
    createConsultant(consultant) {
        return axios.post(URL, consultant);
    }

    getConsultantByOhr(consultantOhr) {
        return axios.get(Consultant_API_BASE_URL + '/' + consultantOhr);
    }

    updateConsultant(consultant) {
        return axios.put(Update_URL, consultant);
    }

    deleteConsultant(consultantOhr) {
        return axios.delete(Consultant_API_BASE_URL + '/' + consultantOhr);
    }

    deleteSelected(selectedCheckboxOhrs) {
        return axios.delete(delete_url + '/' + selectedCheckboxOhrs);
    }

}
export default new ConsultantService()