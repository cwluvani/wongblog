<template>
  <div class="admin">
      <div class="container">
          <h2>Administration</h2>
          <div class="admin-info">
              <h2>Add Admin</h2>
              <div class="input">
                  <input type="text" 
                    placeholder="Enter use email to make them an admin"
                    id="addAdmins"
                    :value="adminEmail"
                    @input="adminEmail = $event.target.value"
                  />
              </div>
              <span>{{ functionMsg }}</span>
              <button class="button" @click="addAdmin">Submit</button>
          </div>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'Admin',
    components: {

    },
    inheritAttrs: false,

    setup() {
        const adminEmail = ref('adminEmail');
        const functionMsg = ref(null);
        
        // imitatation
        async function firebaseFunctionHttpsCallable() {
            return async function(email_Object) {
                return email_Object;
            }
        }

        const addAdmin = async function() {
            const addAdmin = await firebaseFunctionHttpsCallable();
            const result = await addAdmin({ email: adminEmail.value });
            functionMsg.value = result.email;
        };

        return {
            adminEmail,
            functionMsg,
            addAdmin
        }
    }
}
</script>

<style lang="scss" scoped>
.admin {
  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    .admin-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      span {
        font-size: 14px;
      }

      .input {
        margin: 16px 0;

        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          @media (min-width: 900px) {
          }

          &:focus {
            outline: none;
          }
        }
      }

      button {
        align-self: center;
      }
    }
  }
}
</style>