const { Router } = require("express");
const Image = require("../models").image;
const authMiddleware = require("../auth/middleware");

const router = new Router();

//GET ALL IMAGES

// router.get("/", async (req, res, next) => {
//   try {
//     const images = await Image.findAll();
//     res.json(images);
//   } catch (e) {
//     next(e);
//   }
// });

//NOW WE WILL DO THE PAGINATION;

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const limit = req.query.limit || 25; // protect your API by imposing a maximum:
    const offset = req.query.offset || 0;
    console.log({ limit, offset });
    const images = await Image.findAndCountAll({ limit, offset }); // with this we send the number of images we have in api to the client.
    // respond with the images data
    res.json(images);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, url } = req.body;
    if (!title || !url) {
      res.status(400).send("missing information");
    } else {
      const newImage = await Image.create(req.body);
      res.json(newImage);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const imageId = req.params.id; //istenilen id'yi userin verdigi paramstan aliyoruz, yani user 3 etikladiysa route params da 3 cikiyor onu alip istenilen user bilfilerini vriyoruz
  // console.log(req.params, id); once id yi alamadim. o yuzden req params a ve id ye baktik.
  try {
    const image = await Image.findByPk(imageId);

    if (!image) {
      res.status(404).send("No image found");
    } else {
      res.json(image);
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const imageId = parseInt(req.params.id);
    const imageToUpdate = await Image.findByPk(imageId);
    if (!imageToUpdate) {
      res.status(404).send("image not found");
    } else {
      const updatedImage = await imageToUpdate.update(req.body);
      res.json(updatedImage);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
