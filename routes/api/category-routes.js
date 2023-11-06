const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  const categoryData = Category.findAll({
      include: [{model: Product}
      ]});

      res.status(200).json(categoryData).catch((err) => {
        console.log(err);
        res.json(err);
      })});

router.get('/:id', (req, res) => {
  const categoryData = Category.findAll({
      include: [{model: Product}
      ]});

      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }

      res.status(200).json(categoryData).catch((err) => {
        console.log(err);
        res.json(err);
      })});

router.post('/', (req, res) => {
  const categoryData = Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.json(err);
  });

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
