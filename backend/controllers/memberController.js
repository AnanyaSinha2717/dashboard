const Member = require("../models/membermodel");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



// get all members
const getMembers = async (req, res) => {
  const allmembers = await Member.find({}).sort({ createdAt: -1 });

  res.status(200).json(allmembers);
};




//get one member
const getMember = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Member not found" });
  }

  const onemember = await Member.findById(id);

  if (!onemember) {memberName
    return res.status(404).json({ message: "Member not found" });
  }

  res.status(200).json(onemember);
};



// add new member
const addMember = async (req, res) => {
  try {
    const form = formidable.formidable({});

    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      //   console.log(files);
      //   console.log(fields);
      try {
        const memberName = fields.memberName[0];
        const branch = fields.branch[0];
        const rollNum = fields.rollNum[0];
        const year = fields.year[0];
        const birthday = fields.birthday[0];
        const image = files.image[0];

        //   upload image
        const uploadImage = await cloudinary.uploader.upload(image.filepath);
        console.log(uploadImage);

        const member = await Member.create({
          memberName,
          branch,
          year,
          birthday,
          image: uploadImage.secure_url,
        });
        res.status(200).json(member);
        //   res.status(200);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// remove member
const removeMember = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Member not found" });
  }

  const member = await Member.findByIdAndDelete(id);

  if (!member) {
    return res.status(404).json({ error: "Member not found" });
  }

  res.status(200).json(member);
};




// update member info
const updateMember = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Member not found" });
  }

  const member = await Member.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!member) {
    return res.status(404).json({ error: "Member not found" });
  }

  res.status(200).json(blog);
};

module.exports = {
  getMembers,
  getMember,
  addMember,
  removeMember,
  updateMember,
};



// photo add del