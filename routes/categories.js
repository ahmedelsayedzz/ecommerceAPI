const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});

router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();

  if (!category) {
    res.status(404).send("the category can not be created ");
  }
  res.send(category);
});
//api/v1/
router.delete("/:id", (req, res) => {
  Category.findOneAndDelete({ _id: req.params.id })
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "category is deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "category not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

router.get(`/`, async (req, res) => {
  const categorylist = await Category.find();
  if (!categorylist) {
    res.status(500).json({ succsess: false });
  }
  res.send(categorylist);
});
router.get(`/:id`, async (req, res) => {
  const category = await Category.findById({ _id: req.params.id });
  if (!category) {
    res.status(500).json({ succsess: false, message: "given id not found" });
  }
  res.send(category).status(200);
});

router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );
  if (!category) {
    res.status(500).json({ succsess: false, message: "given id not found" });
  }
  res.send(category).status(200);
});

module.exports = router;
