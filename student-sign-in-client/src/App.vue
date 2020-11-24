<template>
  <div id="app">
    
    <NewStudentForm v-on:student-added="newStudentAdded"></NewStudentForm>
    <StudentTable
      v-bind:students="students" 
      v-on:student-present="studentArrivedOrLeft"
      v-on:delete-student="studentDeleted">
    </StudentTable>
    <StudentMessage v-bind:student="mostRecentStudent"></StudentMessage>

  </div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentTable from './components/StudentTable.vue'
import StudentMessage from './components/StudentMessage.vue'

export default {
  name: 'app',
  data() {
    return {
      students: [],
      mostRecentStudent: {}
    }
  },
  components: {
    NewStudentForm,
    StudentTable,
    StudentMessage
  },
  mounted(){
      //    runs updateStudents() on start-up? (I think, I need look at this further)
    this.updateStudents()
  },
  methods: {
    //    adds student, updates students
    newStudentAdded(student) {
      this.$student_api.addStudent(student).then( student => {
        this.updateStudents()
      }).catch(err => {
        let msg = err.response.data.join(', ')
        alert('Error adding student. \n' + msg)
      })
    },
    //    displays message, changes value of present (boolean), updates students
    studentArrivedOrLeft(student, present) {
      student.present = present
      this.$student_api.updateStudent(student).then( () => {
        this.mostRecentStudent = student
        this.updateStudents()
      })          
    },
    //    deletes selected students, and updated students
    studentDeleted(student) {
      this.$student_api.deleteStudent( student.id).then( () => {
        this.updateStudents()
        this.mostRecentStudent = {}
      })
    },    //    Sort by starID, updates students
    updateStudents(){
      this.$student_api.getAllStudents().then( students => { 
      students.sort(function(s1, s2) {
        return s1.starID.toLowerCase() < s2.starID.toLowerCase() ? -1 : 1
      })
      this.students=students
      })
    }
  }
}
</script>

<style>
/* Add any styles for this component here */
</style>
