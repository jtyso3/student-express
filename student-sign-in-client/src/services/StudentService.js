import axios from 'axios'

const base_url = '/api/students'

export default {

    getAllStudents(){       //  get students
        return axios.get(base_url).then( response => {
                return response.data
            })
        },

    addStudent(student){        //  adds students
        return axios.post(base_url, student).then( response =>{
            return response.data
        })
    },

    updateStudent(student) {
        return axios.patch(`${base_url}/${student.id}`, student).then( response => {
            return response.data
        })
    },

    deleteStudent(id) {
        return axios.delete(`${base_url}/${id}`).then( response => {
            return response.data
        })
    }
}