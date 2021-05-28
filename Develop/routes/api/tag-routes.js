const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

const getTagWithId = async (id) => {
  return Tag.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  });
};

// find a single tag by its `id`
// be sure to include its associated Product data
router.get("/:id", async (req, res) => {
  try {
    const tagData = await getTagWithId(req.params.id);

    if (!tagData) {
      res.status(404).json({ message: "No tag was found with that id!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// create a new tag
router.post("/", async (req, res) => {
  try {
    const createTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(createTag);
  } catch (err) {
    res.status(400).status.json(err);
  }
});

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    const tagData = await getTagWithId(req.params.id);
    if (tagData === null) {
      res.status(404).json({ message: "No tag was found with that id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
      res.status(404).json({ message: "No tag was found with that id!" });
      return;
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
