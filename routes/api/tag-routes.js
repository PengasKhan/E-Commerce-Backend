const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  const tagData = Tag.findAll({
    include: [{ model: Product, through: ProductTag, as: "tagged_products" }],
  });

  res
    .status(200)
    .json(tagData)
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get("/:id", (req, res) => {
  const tagData = Tag.findByPk(req.params.id, {
    include: [{ model: Product, through: ProductTag, as: "tagged_products" }],
  });

  if (!tagData) {
    res.status(404).json({ message: "No tag found with this id!" });
    return;
  }

  res
    .status(200)
    .json(tagData)
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.post("/", (req, res) => {
  const tagData = Tag.create(req.body);
  res
    .status(200)
    .json(tagData)
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.put("/:id", (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
});

router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
