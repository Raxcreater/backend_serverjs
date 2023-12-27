const user2 = require('../Model/user')
const post = require('../Model/post')
const token = require('../jwt_tokeens/genrate-tokeens')
const user = require('../Model/user')
const common_controller = require('./common')
const signup = async req => {
  try {
    let chec_email = await user2.find({ Name: req.body.Name })
    if (chec_email.length) {
      console.log('this user already exist')
    } else {
      let payload = req.body

      // let data_in = {
      //     Name: payload.Name,
      //     Email: payload.Email,
      //     mobileNumber: payload.mobileNumber,
      //     City: payload.City
      // }
      // console.log("data_in>>>>>>", data_in)
      let userData = await common_controller.signup_creata(payload)
      console.log('userData>>>>>>', userData)
      let token_data = {
        _id: userData._id
      }
      let token_generation = await token.generate_token(token_data)

      let query_update = {
        _id: userData._id
      }
      let update_token = {
        accessToken: token_generation
      }
      let token_update = await user.updateOne(query_update, update_token)

      return userData, token_update
    }
  } catch (err) {
    throw err
  }
}
let login = async req => {
  try {
    let loginn = await user2.find({ Name: req.body.Name })

    if (loginn.length) {
      let token_genrated = await token.generate_token({ _id: loginn[0]._id })
      let token_update = await user.updateOne(
        { Name: loginn[0].Name },
        { accessToken: token_genrated }
      )
      return loginn, token_update
    } else {
      throw { msg: 'signup first' }
    }
  } catch (err) {
    throw err
  }
}

let createPost = async (req, user_data) => {
  try {
    console.log("userdataaaaaa................", user_data)
    let set_data = {
      userId: user_data._id,
      title: req.title,
      likesCount: req.likesCount,
      shares: req.shares
    }
    let posting = await post.create(set_data,user_data)
    console.log("posting................", posting)
    return posting
  } catch (err) {
    throw err
  }
}
let multiplePost = async (payloadData) => {
  try {
    console.log('payloadData>>>>>>>>', payloadData)

    let pictures = await post.insertMany(payloadData.post_data)
    connsole.log('pictures>>>>>>', pictures)
    return pictures
  } catch (err) {
    throw err
  }
}
let updatePost = async (payloadData) => {
  try {
    let condition = {
      _id: payloadData._id
    }
    let update_data = {
      title: payloadData.title
    }
    let update = await post.updateMany(condition, update_data)
  } catch (err) {
    throw err
  }
}
let updateSinglePost = async payloadData => {
  try {
    let condition = {
      _id: payloadData._id
    }
    let updattingOne = await post.updateOne(condition, {
      title: payloadData.title
    })
  } catch (err) {
    throw err
  }
}
let deleteOne = async payloadData => {
  try {
    let condition = {
      _id: payloadData._id
    }
    let oneDelete = await post.deleteOne(condition, {
      title: payloadData.title
    })
  } catch (err) {
    throw err
  }
}

let deleteMany = async payloadData => {
  try {
    let condition = {
      _id: payloadData._id
    }
    let multipleDelete = await post.deleteMany(condition)
  } catch (err) {
    throw err
  }
}
let delete_edit = async (payloadData, userData) => {
  try {

    if (payloadData._id) {
      let condition = {
        _id: payloadData._id
      }
      let update = {}
      if (payloadData.isDeleted == true) {
        update.isDeleted = true
      }
      if (payloadData.title) {
        update.title = payloadData.title
      }

      console.log('codition>>>>', condition)
      await post.updateMany(condition, update)

      // to update documents
    }
  } catch (err) {
    throw err
  }
}
let fetchingusers = async payloadData => {
  try {
    let gettingUser = await user2.find()
    return gettingUser
  } catch (err) {
    throw err
  }
}

let gettting_token = async payloadData => {
  try {
    console.log('payloadData>>>>>gettting_token>>>>>>>>', payloadData)
    let find_token_user = await user2.findOne({ accessToken: payloadData.abcd })
    return find_token_user
  } catch (err) {
    throw err
  }
}
let querydata = async (payloadData) => {
  try {
    let getting_param = await user2.findOne({ _id: payloadData._id })
    return getting_param
  } catch (err) {
    throw err
  }
}
let abc = async (payload, listuser) => {
  try {
    let extracting_user = await post.find({ userId: listuser._id })
    return extracting_user
  }
  catch (err) {
    throw err
  }

}

let using_populate = async (payload) => {
  try {
    let getting_populate = await post.find({ title: payload.title }).populate('userId')
    return getting_populate

  } catch (err) { throw err }
}
module.exports = {
  signup,
  login,
  createPost,
  multiplePost,
  updatePost,
  updateSinglePost,
  deleteOne,
  deleteMany,
  delete_edit,
  fetchingusers,
  gettting_token,
  querydata,
  abc,
  using_populate
}
