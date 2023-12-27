const user = require('../Model/user')
const user_in_comman = require('../Model/user')

const signup_creata = async (payload) => {
    try {
         
          let data={  Name: payload.Name,
            Email: payload.Email,
            mobileNumber: payload.mobileNumber,
            City: payload.City,
            Country: payload.Country
        }
        let creating_user=  await user.create(data)
        return creating_user
        
         } catch (err) { throw err }
}
module.exports = {
    signup_creata
}