let express = require('express')
let router = express.Router()
const user = require('../Model/user')
const { model } = require('mongoose')
const userController = require('../Controler/user')
const post = require('../Model/post')
const valid_limations = require('../validation/user_singup_vali')
const Joi = require('joi')

const authorizationn = async (req, res, next) => {
  try {
    let get_data = await user.findOne({ accessToken: req.headers.authorization }, { __v: 0 }, { lean: true })
    if (get_data) {
      req.user_data = get_data
      next()
    
    } else {

    }
  } catch (err) {
    throw err
  }
}

const validation_request = async (req, res, next) => {
  try {
    const { error } = valid_limations.valid_schema.validate(req.body)

    if (error) {
      return res.status(400).send(error.details[0].message)
    }
    next()
  } catch (err) {
    throw err
  }
}

// let validation= await valid_limations.valid_schema.validate(req.body)

router.post('/signup', validation_request, async (req, res) => {
  try {
    // const { error, value } = valid_limations.valid_schema.validate(req.body);
    // if(error){
    //     res.status(400).send(error.details[0].message)
    // }
    data = await userController.signup(req)

    res.send(data)
  } catch (err) {
    res.send(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    let loginData = await userController.login(req)
    // if(loginData){
    res.status(200).send(loginData)
    // }else{
    //     res.status(400).send("signup first")
    // }
  } catch (err) {
    res.status(200).send(err)
  }
})
router.post('/createPost', authorizationn, async (req, res) => {
  try {
    let posting = await userController.createPost(req.body, req.user_data)
    res.send(posting)
  } catch (err) {
    res.send(err)
  }
})
router.post('/multiplePost', async (req, res) => {
  try {
    let pictures = await userController.multiplePost(req.body)
    res.send(pictures)
  } catch (err) {
    res.send(err)
  }
})
router.post('/updatePost', async (req, res) => {
  try {
    let update = await userController.updatePost(req.body)
    res.send(update)
  } catch (err) {
    res.status(400).send('not found')
  }
})
router.post('/updateSinglePost', async (req, res) => {
  try {
    let updateOne = await userController.updateSinglePost(req.body)
    res.send(updateOne)
  } catch (err) {
    res.status(400).send('not found')
  }
})
router.post('/deleteOne', async (req, res) => {
  try {
    let delettingPost = await userController.deleteOne(req.body)
    res.send(delettingPost)
  } catch (err) {
    res.send(err)
  }
})
router.post('/deleteMany', async (req, res) => {
  try {
    let dettingMany = await userController.deleteMany(req.body)
    res.send(dettingMany)
  } catch (err) {
    throw err
  }
})


router.post('/edittng_delete', authorizationn, async (req, res) => {
  try {

    let adding_detting = await userController.delete_edit(req.body, req.user_data)
    res.send(adding_detting)
  } catch (err) {
    throw err
  }
})
router.get('/gettingUserList', async (req, res) => {
  try {
    console.log('req>>>>>>>>', req)

    let allUsers = await userController.fetchingusers(req.body)
    res.send(allUsers)
  } catch (err) {
    throw err
  }
})

router.get('/gettingheadertoken', async (req, res) => {
  try {
    let me_get_token_form_Headers = await userController.gettting_token(
      req.headers
    )
    res.send(me_get_token_form_Headers)
  } catch (err) {
    throw err
  }
})
router.get('/responseby_param_query', async (req, res) => {
  try {
    let param_data = await userController.querydata(req.query)
    res.send(param_data)
  } catch (err) {
    throw err
  }
})
router.get('/listing_post', authorizationn,async (req, res) => {
  try {
    let listuser= await req.user_data
    let listing_user = await userController.abc(req,listuser) 
    
    res.send(listing_user)
  } catch (err) {
    throw err
  }
})

router.get('/populating',async(req,res)=>{
  try{
    let populating_details=await userController.using_populate(req.body)
res.send(populating_details)
  }catch (err){throw err}
})
const ex = (module.exports = router)

// console.log("reqoutput:", req)
//     let data = {
//         Name: "vinay",
//         Email: "vinay@gamil.com",
//         mobileNumber: 8894766577,
//         City: "mandi",
//         time:new Date().getTime

//     }
//     let inser_multiple_data = [
//         {
//             Name: "vinay",
//             Email: "vinay@gamil.com",
//             mobileNumber: 8894766577,
//             City: "mandi",

//         },
//         {
//             Name: "vinay",
//             Email: "vinay@gamil.com",
//             mobileNumber: 8894766577,
//             City: "mandi",

//         }, {
//             Name: "vinay",
//             Email: "vinay@gamil.com",
//             mobileNumber: 8894766577,
//             City: "mandi",

//         }, {
//             Name: "vinay",
//             Email: "vinay@gamil.com",
//             mobileNumber: 8894766577,
//             City: "mandi",

//         }, {
//             Name: "vinay",
//             Email: "vinay@gamil.com",
//             mobileNumber: 8894766577,
//             City: "mandi",

//         },

//     ]
//     // let save_data = await user.create(data) //to save the data modelname create and variable name.//for single data insert into db
//     let inerst_many = await user.insertMany(inser_multiple_data)//for insert many data into db
