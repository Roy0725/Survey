<template>
    <div class="inside">
        <h1>安安</h1>
    </div>
    <button @click="showConfirmation">show</button>

</template>
<script>
import Swal from 'sweetalert2'

Swal.fire({
  template: '#my-template'
});

export default {
    date(){
        return{

        }
    },
    methods:{
        showAlert() {
      Swal.fire('Hello, SweetAlert2!')
    },

    showConfirmation() {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'confirm',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your file is safe :)', 'error')
        }
      })
    },
}
}
</script>

<style lang="scss" scoped>
    .inside{
        width: 50%;
        height: 50%;
        border: 1px solid black;
    }
</style>