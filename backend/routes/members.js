const express = require('express')

const router = express.Router()

const {
    getMembers,
    getMember,
    addMember,
    removeMember,
    updateMember
} = require('../controllers/memberController')



// handling request using router
// GET all members
router.get('/', getMembers)



// GET one member
router.get('/:id', getMember)



//add a member
router.post('/', addMember)



// remove member
router.delete('/:id', removeMember)



// UPDATE member info
router.patch('/:id', updateMember)



module.exports = router