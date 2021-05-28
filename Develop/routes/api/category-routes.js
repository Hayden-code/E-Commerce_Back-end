const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// Function for getting all categories
router.get("/", async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: {
        model: Product,
        attributes: ["product_name"],
      },
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Function for getting one category by its 'id' value
router.get("/:id", async (req, res) => {
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ["category_id"],
      },
    });

    if (!oneCategory) {
      res.status(404).json({ message: "No category was found with that id!" });
      return;
    }

    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Function for creating (posting) new category
router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Function for updating category using 'id'
router.put("/:id", async (req, res) => {
  try {
    const categoryData = Category.update(req.body, {
      where: {
        id: req.params.id,
      },
      include: {
        model: Product,
        attributes: ["category_id"],
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Function for deleting category using 'id'
router.delete("/:id", async (req, res) => {
  try {
    const deleteData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(deleteData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
